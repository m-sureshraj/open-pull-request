import { spawnSync } from 'child_process';

import { removeNewLine } from './util.js';

export function isGitRepository() {
  const { stdout } = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
    encoding: 'utf8',
  });

  return Boolean(stdout);
}

export function getBranchName() {
  const { stdout, stderr } = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
    encoding: 'utf8',
  });

  if (stderr) throw new Error(stderr);

  return removeNewLine(stdout);
}

export function getRemoteUrl() {
  const { stdout, stderr } = spawnSync('git', ['config', '--get', 'remote.origin.url'], {
    encoding: 'utf8',
  });

  if (stderr) throw new Error(stderr);

  return removeNewLine(stdout);
}
