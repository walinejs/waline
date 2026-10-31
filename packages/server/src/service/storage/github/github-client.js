'use strict';

/**
 * GitHub repository read/write client.
 *
 * Reads go through the Contents API (single file) and Git Trees API (batch
 * listing), which is orders of magnitude cheaper than downloading everything.
 * Writes go through the Git Data API (blobs -> tree -> commit -> ref) so a
 * multi-shard write is one atomic commit. Ref updates use force=false as an
 * optimistic lock: if the branch moved since we read head, GitHub rejects the
 * non-fast-forward update instead of silently dropping someone else's commit.
 * Only 429/5xx are retried, since retrying 401/403/422 changes nothing.
 */

const { setTimeout: sleep } = require('node:timers/promises');
const { createHash } = require('node:crypto');

const USER_AGENT = 'Waline-Sharded-CSV';

// sha1("blob <length>\0<content>"), which is GitHub's blob SHA, so shard SHAs can be computed locally before committing.
const gitBlobSha = (content) => {
  const buffer = Buffer.from(content, 'utf8');

  return createHash('sha1')
    .update(`blob ${buffer.length}\0`, 'utf8')
    .update(buffer)
    .digest('hex');
};

// GitHub API business error, carrying the HTTP status for callers to branch on.
class GithubApiError extends Error {
  constructor(status, message, body) {
    super(message);
    this.name = 'GithubApiError';
    this.status = status;
    this.body = body;
  }
}

// Shard SHA or branch was moved by someone else: a recoverable write conflict.
class ShaConflictError extends GithubApiError {
  constructor(message, body) {
    super(409, message, body);
    this.name = 'ShaConflictError';
  }
}

// Repository missing or token unauthorized; GitHub answers both with 404.
class RepoNotAccessibleError extends GithubApiError {
  constructor(repo) {
    super(
      404,
      `无法访问 GitHub 仓库 "${repo}"：请确认 GITHUB_REPO 为 owner/repo 形式，且 GITHUB_TOKEN 已授权访问该仓库`,
    );
    this.name = 'RepoNotAccessibleError';
  }
}

/**
 * Retryability check.
 *
 * Besides 429/5xx this also covers GitHub's secondary rate limit, which comes
 * back as 403 (not 429) with a rate limit / abuse detection message; missing
 * that turns a throttle into a "token has no permission" 500.
 */
const RATE_LIMIT_MESSAGE = /rate limit|abuse detection|secondary rate/iu;

const isRetryableStatus = (status) => status === 429 || status >= 500;

const isRetryable = (status, body) =>
  isRetryableStatus(status) || (status === 403 && RATE_LIMIT_MESSAGE.test(String(body?.message ?? '')));

// Parse Retry-After in either seconds or HTTP-date form.
const parseRetryAfter = (value) => {
  if (!value) {
    return null;
  }
  const seconds = Number.parseInt(String(value).trim(), 10);

  if (Number.isFinite(seconds)) {
    return Math.max(seconds, 0) * 1000;
  }
  const when = Date.parse(String(value));

  return Number.isNaN(when) ? null : Math.max(when - Date.now(), 0);
};

// Bounded concurrency: blob upload is the step most easily serialized away.
async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(Math.max(limit, 1), items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;

      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);

  return results;
}

class GithubClient {
  constructor({
    token,
    repo,
    branch = 'main',
    apiBase = 'https://api.github.com',
    fetchImpl = globalThis.fetch,
    logger = console,
    maxRetries = 2,
    timeoutMs = 20000,
    blobConcurrency = 8,
  } = {}) {
    if (!token) {
      throw new Error('GITHUB_TOKEN 未配置，无法读写 GitHub 仓库');
    }
    if (!repo) {
      throw new Error('GITHUB_REPO 未配置（应为 owner/repo 形式）');
    }

    this.token = String(token).trim();
    // Environment variables often arrive as a full URL, with .git, or with padding
    this.repo = String(repo)
      .trim()
      .replace(/^https?:\/\/(?:www\.)?github\.com\//iu, '')
      .replace(/\.git$/iu, '')
      .replace(/^\/+|\/+$/gu, '');
    this.branch = String(branch || 'main').trim();
    this.apiBase = apiBase.replace(/\/+$/u, '');
    this.fetchImpl = fetchImpl;
    this.logger = logger;
    this.maxRetries = maxRetries;
    this.timeoutMs = timeoutMs;
    this.blobConcurrency = blobConcurrency;
    this.requestCount = 0;
  }

  // Single request exit; requestCount quantifies API cost for the benchmark.
  async request(method, path, { body, query, allow404 = false } = {}) {
    let url = `${this.apiBase}/repos/${this.repo}${path}`;

    if (query) {
      url += `?${new URLSearchParams(query).toString()}`;
    }

    const init = {
      method,
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `token ${this.token}`,
        'user-agent': USER_AGENT,
        ...(body ? { 'content-type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    let lastError;
    let retryAfterMs = null;

    for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
      this.requestCount += 1;
      retryAfterMs = null;

      try {
        const res = await this.fetchImpl(url, {
          ...init,
          signal: AbortSignal.timeout(this.timeoutMs),
        });
        const text = await res.text();
        // GitHub occasionally answers with non-JSON (gateway error pages); keep
        // a retryable 502 from becoming an opaque SyntaxError
        let data = {};

        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = { message: text ? text.slice(0, 200) : res.statusText };
        }

        if (res.ok) {
          return data;
        }
        if (res.status === 404 && allow404) {
          return null;
        }
        if (!isRetryable(res.status, data)) {
          throw new GithubApiError(res.status, data?.message || res.statusText, data);
        }

        // Retry-After is authoritative; guessing a wait only makes throttling worse
        retryAfterMs = parseRetryAfter(res.headers?.get?.('retry-after'));
        lastError = new GithubApiError(res.status, data?.message || res.statusText, data);
      } catch (err) {
        if (err instanceof GithubApiError && !isRetryable(err.status, err.body)) {
          throw err;
        }
        lastError = err;
      }

      if (attempt < this.maxRetries) {
        // Jitter keeps concurrent instances from retrying in lockstep
        const backoff = retryAfterMs ?? 500 * 2 ** attempt + Math.floor(Math.random() * 150);

        this.logger.warn?.(
          `[github] ${method} ${path} 第 ${attempt + 1} 次失败（${lastError.message}），${backoff}ms 后重试`,
        );
        await sleep(backoff);
      }
    }

    throw lastError;
  }

  // Branch head; the tree SHA doubles as the base_tree for the Git Data API.
  async getBranchHead() {
    const data = await this.request('GET', `/branches/${encodeURIComponent(this.branch)}`, {
      allow404: true,
    });

    if (!data) {
      // Distinguish "empty repository" from "repository not accessible", otherwise
      // the user gets a misleading error
      const repoInfo = await this.request('GET', '', { allow404: true });

      if (!repoInfo) {
        throw new RepoNotAccessibleError(this.repo);
      }

      return null;
    }

    return { headSha: data.commit.sha, treeSha: data.commit.commit.tree.sha };
  }

  // Read one file; null means "does not exist yet", and files over 1MB fall back to the Blob API.
  async getFile(filePath) {
    const data = await this.request(
      'GET',
      `/contents/${encodeURI(filePath)}`,
      { query: { ref: this.branch }, allow404: true },
    );

    if (!data) {
      return null;
    }
    if (Array.isArray(data)) {
      throw new GithubApiError(400, `期望文件但拿到目录：${filePath}`);
    }

    const content =
      data.encoding === 'base64' && data.content
        ? Buffer.from(data.content, 'base64').toString('utf8')
        : await this.getBlobContent(data.sha);

    return { content, sha: data.sha, size: data.size ?? Buffer.byteLength(content, 'utf8') };
  }

  async getBlobContent(sha) {
    const blob = await this.request('GET', `/git/blobs/${sha}`);

    return Buffer.from(blob.content, 'base64').toString('utf8');
  }

  // Recursively list the repository tree as Map<path, {sha, size}>; an empty
  // repository yields an empty map rather than an error.
  async listTree(prefix = '') {
    const data = await this.request('GET', `/git/trees/${encodeURIComponent(this.branch)}`, {
      query: { recursive: '1' },
      allow404: true,
    });

    if (!data) {
      return new Map();
    }
    if (data.truncated) {
      throw new GithubApiError(
        422,
        '仓库文件过多，Git Trees API 返回被截断，无法安全地做快照/合并；请拆分仓库或联系维护者',
      );
    }

    const files = new Map();

    for (const entry of data.tree ?? []) {
      if (entry.type === 'blob' && (!prefix || entry.path.startsWith(prefix))) {
        files.set(entry.path, { sha: entry.sha, size: entry.size ?? 0 });
      }
    }

    return files;
  }

  async createBlob(content) {
    const data = await this.request('POST', '/git/blobs', {
      body: { content: Buffer.from(content, 'utf8').toString('base64'), encoding: 'base64' },
    });

    return data.sha;
  }

  /**
   * Commit several files at once.
   *
   * The caller must pass `head` read *before* reading data, which together with
   * the force=false ref update forms the optimistic lock: if anyone commits
   * after that head, our non-fast-forward update is rejected and we retry
   * instead of overwriting them. Reading head here instead would let a commit
   * that lands between "read data" and "read head" be silently overwritten.
   *
   * `orphan` drops parents and base_tree, leaving only this commit's files in
   * the repository; `force` accepts a non-fast-forward ref move. Both exist for
   * the intentional history rewrite behind "reset repository".
   */
  async commitChanges({ message, upserts = new Map(), deletes = [], head, force = false, orphan = false }) {
    const resolvedHead = head === undefined ? await this.getBranchHead() : head;

    if (upserts.size === 0 && [...deletes].length === 0) {
      return { headSha: resolvedHead?.headSha ?? null, uploaded: 0 };
    }

    const baseTree = orphan ? null : resolvedHead?.treeSha ?? null;
    const uploads = [];
    const shaOf = new Map();

    for (const [filePath, value] of upserts) {
      if (typeof value === 'string') {
        uploads.push([filePath, value]);
      } else {
        shaOf.set(filePath, value.sha);
      }
    }

    // Concurrent upload: one blob per shard, serializing would cost N round trips
    await mapLimit(uploads, this.blobConcurrency, async ([filePath, content]) => {
      shaOf.set(filePath, await this.createBlob(content));
    });

    const tree = [];

    for (const [filePath] of upserts) {
      tree.push({ path: filePath, mode: '100644', type: 'blob', sha: shaOf.get(filePath) });
    }
    for (const filePath of deletes) {
      // The Git Data API spells "delete this path" as sha: null
      tree.push({ path: filePath, mode: '100644', type: 'blob', sha: null });
    }

    const treeData = await this.request('POST', '/git/trees', {
      body: { ...(baseTree ? { base_tree: baseTree } : {}), tree },
    });
    const commitData = await this.request('POST', '/git/commits', {
      body: {
        message,
        tree: treeData.sha,
        parents: orphan || !resolvedHead ? [] : [resolvedHead.headSha],
      },
    });

    await this.updateRef(commitData.sha, resolvedHead?.headSha ?? null, { force });

    return { headSha: commitData.sha, uploaded: uploads.length };
  }

  // Move the branch pointer; force=false is what makes conflicts visible.
  async updateRef(commitSha, previousHeadSha, { force = false } = {}) {
    if (previousHeadSha === null) {
      try {
        await this.request('POST', '/git/refs', {
          body: { ref: `refs/heads/${this.branch}`, sha: commitSha },
        });

        return;
      } catch (err) {
        // 422 here means the branch appeared since we read head, also a conflict
        if (err instanceof GithubApiError && err.status === 422) {
          throw new ShaConflictError(`分支 ${this.branch} 已被并发创建`, err.body);
        }
        throw err;
      }
    }

    try {
      await this.request('PATCH', `/git/refs/heads/${encodeURIComponent(this.branch)}`, {
        body: { sha: commitSha, force },
      });
    } catch (err) {
      if (err instanceof GithubApiError && (err.status === 422 || err.status === 409)) {
        throw new ShaConflictError(`分支 ${this.branch} 已被并发推进`, err.body);
      }
      throw err;
    }
  }
}

module.exports = {
  GithubClient,
  GithubApiError,
  ShaConflictError,
  RepoNotAccessibleError,
  gitBlobSha,
};
