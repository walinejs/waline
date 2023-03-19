import { init } from '@rematch/core';

import { user } from './user.js';

export const store = init({ models: { user } });
