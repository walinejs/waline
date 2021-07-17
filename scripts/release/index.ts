import { release } from './release';

release().catch((err) => {
  console.error(err);
  process.exit(1);
});
