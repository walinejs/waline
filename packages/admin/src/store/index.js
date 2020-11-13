import { init } from '@rematch/core';
import { user } from './user';

export const store = init({ models: { user } });
