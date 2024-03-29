import { version, description } from '../package.json';

export function printUsage() {
  console.log(`\n open-pull-request (v${version})\n`);
  console.log(` ${description}\n`);
  console.log(' Usage:');
  console.log('   op \t\topen the associated pull request of the branch in the browser');
  console.log('   op token \tAdd personal access token');
  console.log('   op help \tShow this message\n');
  console.log(' All these commands optionally take --debug option to log debug messages\n')
}
