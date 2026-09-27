export class WalineError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    public readonly messageKey?: string,
    public readonly details?: unknown,
  ) {
    super(messageKey ?? code);
    this.name = 'WalineError';
  }
}

export const badRequest = (details?: unknown): never => {
  throw new WalineError('VALIDATION_ERROR', 400, undefined, details);
};

export const unauthorized = (): never => {
  throw new WalineError('UNAUTHORIZED', 401);
};

export const forbidden = (): never => {
  throw new WalineError('FORBIDDEN', 403);
};

export const capability = (name: string): never => {
  throw new WalineError('CAPABILITY_UNAVAILABLE', 501, undefined, { capability: name });
};
