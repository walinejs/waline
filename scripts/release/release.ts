import execa = require('execa');
import ora = require('ora');
import { prompt } from 'inquirer';
import { getNpmTags, getVersion } from './version';
import { sync } from './sync';
import type { Answers } from './version';

export const release = async (): Promise<void> => {
  const buildSpinner = ora('Building project').start();

  await execa('yarn', ['run', 'clean']);
  await execa('yarn', ['run', 'build']);

  buildSpinner.succeed();

  const { npmTag } = await prompt<Answers>([
    {
      name: 'npmTag',
      message: 'Input npm tag:',
      type: 'list',
      default: (answers: Answers): string => getNpmTags(getVersion(answers))[0],
      choices: (answers: Answers): string[] => getNpmTags(getVersion(answers)),
    },
  ]);

  const releaseArguments = [
    'publish',
    '--dist-tag',
    npmTag,
    '--registry',
    'https://registry.npmjs.org/',
  ];

  await execa(require.resolve('lerna/cli'), releaseArguments, {
    stdio: 'inherit',
  });

  const taobaoSpinner = ora('Syncing npm.taobao.org').start();

  await sync();
  taobaoSpinner.succeed();

  ora('Release complete').succeed();
};
