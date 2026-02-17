const RSS = require('rss');
const BaseRest = require('../rest.js');
const { getMarkdownParser } = require('../../service/markdown/index.js');

const markdownParser = getMarkdownParser();

const isHttpUrl = (value) => /^(https?:)?\/\//i.test(value);

const buildAbsoluteUrl = (baseUrl, path) => {
  if (!path) return baseUrl || '';
  if (isHttpUrl(path)) return path;
  if (!baseUrl) return path;
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
};

const buildRssXml = ({ title, link, description, items }) => {
  const channelLink = link || '';
  const now = new Date().toUTCString();

  const feed = new RSS({
    title,
    description,
    site_url: channelLink,
    pubDate: now,
  });

  items.forEach((item) => {
    feed.item({
      title: item.title || 'Comment',
      description: item.description,
      url: item.link || '',
      guid: item.guid || item.link || '',
      date: item.pubDate || now,
    });
  });

  return feed.xml({ indent: true });
};

const setRssResponse = (ctx, xml) => {
  ctx.set('Content-Type', 'application/rss+xml; charset=utf-8');
  ctx.body = xml;
};

module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.modelInstance = this.getModel('Comment');
  }

  async getAction() {
    const { path, email, user_id: userId, count } = this.get();
    const limit = Number.isFinite(Number(count)) ? Number(count) : 20;
    const safeLimit = Math.min(Math.max(limit, 1), 50);

    const siteUrl = process.env.SITE_URL || this.ctx.serverURL;
    const siteName = process.env.SITE_NAME || 'Waline';

    const where = {
      status: ['NOT IN', ['waiting', 'spam']],
    };

    if (path) {
      where.url = path;
    } else if (email || userId) {
      const parentWhere = {
        status: ['NOT IN', ['waiting', 'spam']],
      };

      if (email && userId) {
        parentWhere._complex = {
          _logic: 'or',
          mail: email,
          user_id: userId,
        };
      } else if (email) {
        parentWhere.mail = email;
      } else if (userId) {
        parentWhere.user_id = userId;
      }

      const parents = await this.modelInstance.select(parentWhere, {});
      const parentIds = parents.map(({ objectId }) => objectId).filter(Boolean);

      if (parentIds.length === 0) {
        setRssResponse(
          this.ctx,
          buildRssXml({
            title: `${siteName} Reply Comments`,
            link: siteUrl,
            description: 'Recent reply comments.',
            items: [],
          }),
        );
        return;
      }

      where.pid = ['IN', parentIds];
    }

    const comments = await this.modelInstance.select(where, {
      desc: 'insertedAt',
      limit: safeLimit,
      field: ['comment', 'insertedAt', 'link', 'nick', 'url', 'user_id'],
    });

    const userModel = this.getModel('Users');
    const userIds = [...new Set(comments.map(({ user_id }) => user_id).filter(Boolean))];
    let users = [];

    if (userIds.length > 0) {
      users = await userModel.select(
        { objectId: ['IN', userIds] },
        { field: ['display_name', 'url'] },
      );
    }

    const items = comments.map((comment) => {
      const user = users.find(({ objectId }) => objectId === comment.user_id);
      const nick = user?.display_name || comment.nick || 'Anonymous';
      const commentUrl = buildAbsoluteUrl(siteUrl, comment.url);
      const itemLink = commentUrl ? `${commentUrl}#${comment.objectId}` : '';
      const description = markdownParser(comment.comment || '');

      return {
        title: `${nick} commented${comment.url ? ` on ${comment.url}` : ''}`,
        link: itemLink || commentUrl,
        guid: comment.objectId,
        pubDate: new Date(comment.insertedAt).toUTCString(),
        description,
      };
    });

    const title = path
      ? `${siteName} Comments for ${path}`
      : email || userId
        ? `${siteName} Reply Comments`
        : `${siteName} Recent Comments`;
    const description = path
      ? `Recent comments for ${path}.`
      : email || userId
        ? 'Recent reply comments.'
        : 'Recent comments.';

    setRssResponse(
      this.ctx,
      buildRssXml({
        title,
        link: siteUrl,
        description,
        items,
      }),
    );
  }
};
