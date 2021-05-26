import mitt from 'mitt';

import type { Emitter, Handler, WildcardHandler } from 'mitt';

export interface WalineEvent extends Emitter {
  on(type: 'render', handler: Handler<AbortSignal>): void;
  on(type: '*', handler: WildcardHandler): void;
  emit(type: 'render', event: AbortSignal): void;

  emit(type: '*', event?: unknown): void;
}

export const getEvent = (): WalineEvent => mitt();
