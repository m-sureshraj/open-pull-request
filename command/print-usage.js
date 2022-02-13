import { version, description } from '../package.json';

export function printUsage() {
  console.log(`\n open-pull-request (v${version})\n`);
  console.log(` ${description}\n`);
  console.log(' Usage:');
  console.log('   op \t\topen the associated pull request of a branch in the browser');
  console.log('   op token \tAdd personal access token');
  console.log('   op help \tShow this message\n');
}
