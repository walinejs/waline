import type { WalineModels } from '@waline/core';
import { createWalineWorker } from '@waline/worker';

declare const models: WalineModels;

const app = createWalineWorker({ models });

export default async function handler(request: Request): Promise<Response> {
  return app.fetch(request, { JWT_TOKEN: process.env.JWT_TOKEN });
}
