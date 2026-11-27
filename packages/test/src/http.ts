/* oxlint-disable max-classes-per-file, typescript/strict-boolean-expressions */

import { apiURL } from './url.js';

export class RequestError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'RequestError';
  }
}

export interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string;
  json?: boolean;
  api?: boolean;
}

export class HttpClient {
  constructor(
    private readonly serverURL: string,
    private readonly timeout: number,
    private readonly fetchImplementation: typeof globalThis.fetch = globalThis.fetch,
  ) {}

  async request(
    path: string,
    options: RequestOptions = {},
  ): Promise<{
    response: Response;
    data: unknown;
  }> {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
    }, this.timeout);
    const url = options.api === false ? `${this.serverURL}${path}` : apiURL(this.serverURL, path);
    const headers: Record<string, string> = {};

    if (options.body !== undefined) headers['Content-Type'] = 'application/json';
    if (options.token) headers.Authorization = `Bearer ${options.token}`;

    try {
      const response = await this.fetchImplementation(url, {
        method: options.method ?? 'GET',
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: controller.signal,
      });
      const text = await response.text();
      let data: unknown = text;

      if (options.json !== false) {
        try {
          data = text ? (JSON.parse(text) as unknown) : undefined;
        } catch {
          throw new RequestError(
            `${options.method ?? 'GET'} ${path} returned non-JSON content`,
            response.status,
          );
        }
      }

      if (!response.ok) {
        throw new RequestError(
          `${options.method ?? 'GET'} ${path} returned HTTP ${response.status}`,
          response.status,
        );
      }

      return { response, data };
    } catch (err) {
      if (err instanceof RequestError) throw err;
      if (err instanceof Error && err.name === 'AbortError') {
        throw new RequestError(
          `${options.method ?? 'GET'} ${path} timed out after ${this.timeout}ms`,
        );
      }
      throw new RequestError(
        `${options.method ?? 'GET'} ${path} failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      clearTimeout(timer);
    }
  }
}

export const record = (value: unknown, label: string): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be a JSON object`);
  }

  return value as Record<string, unknown>;
};

export const successData = (value: unknown, label: string): unknown => {
  const body = record(value, label);

  if (typeof body.errno !== 'number') throw new TypeError(`${label} is missing numeric errno`);
  if (body.errno !== 0) {
    const message =
      typeof body.errmsg === 'string' ? body.errmsg : JSON.stringify(body.errmsg ?? '');
    throw new TypeError(`${label} failed with errno ${body.errno}: ${message}`);
  }

  return body.data;
};
