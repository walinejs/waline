import mitt, { Emitter } from 'mitt';

export type WalineEvent = {
  render: AbortSignal;
};

export const getEvent = (): Emitter<WalineEvent> => mitt<WalineEvent>();
