/* oxlint-disable import/no-commonjs, import/unambiguous, jsdoc/check-tag-names, unicorn/prefer-module */

/**
 * @typedef {{
 *   objectId: string;
 *   type: string;
 *   email?: string;
 *   display_name?: string;
 *   url?: string;
 *   avatar?: string;
 *   password?: string;
 *   '2fa'?: string;
 * }} User
 *
 * @typedef {{
 *   select(where: object, options?: object): Promise<object[]>;
 *   add(data: object, options?: object): Promise<object>;
 *   update(data: object | Function, where: object): Promise<object[]>;
 *   delete(where: object): Promise<unknown>;
 *   count(where?: object, options?: object): Promise<number | object[]>;
 * }} Repository
 *
 * @typedef {{
 *   repositories: { comments: Repository; counters: Repository; users: Repository };
 *   config: object;
 *   password: { verify(password: string, hash: string): boolean };
 *   tokens: { sign(subject: string): string };
 *   avatar: { stringify(user: object): Promise<string> };
 *   clock?: { now(): number };
 *   formatDate?: (value: Date) => string;
 * }} CorePorts
 *   Route action DTOs: get/create/update/delete comment; get comment RSS; get/update article
 *   counter; get/create/update/delete user; get/create/delete token; get/create two-factor setup;
 *   reset password; verify user; OAuth callback; and get/create/update/delete database records.
 *
 *   Every public action accepts a plain request DTO plus {@link CorePorts}; it returns a plain
 *   response DTO or throws a DomainError. HTTP status codes, response envelopes, redirects, and
 *   framework objects deliberately remain in the host adapter.
 */
module.exports = {};
