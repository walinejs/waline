import { verifyCommitMessage } from '@mr-hope/verify-commit-message';

await verifyCommitMessage({ importMeta: import.meta, process, packages: ['docs', 'packages/*'] });
