import { tex } from '@mdit/plugin-tex';
import { texRenderer } from '@tex';

import { markdownIt } from './markdown-it.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
markdownIt.use(tex, { render: texRenderer });
