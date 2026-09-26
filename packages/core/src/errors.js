/* oxlint-disable import/no-commonjs, import/unambiguous, unicorn/prefer-module */

class DomainError extends Error {
  constructor(message, { status = 400, code = 'BAD_REQUEST', data } = {}) {
    super(message);
    this.name = 'DomainError';
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

const unauthorized = (message = 'Unauthorized') =>
  new DomainError(message, { status: 401, code: 'UNAUTHORIZED' });

const forbidden = (message = 'Forbidden') =>
  new DomainError(message, { status: 403, code: 'FORBIDDEN' });

module.exports = { DomainError, forbidden, unauthorized };
