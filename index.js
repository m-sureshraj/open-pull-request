#! /usr/bin/env node

import { saveToken, main, printUsage } from './command';
import { red } from './lib/colors';
import { debug } from './lib/util';

let argv = process.argv.slice(2);

if (argv.includes('--debug')) {
  process.env.DEBUG_OP = true;
  argv = argv.filter(v => v !== '--debug');
}

let command = argv.pop() ?? '';

switch (command.trim()) {
  // execute the main logic
  case '':
    debug('Executing the main logic');
    main().catch(console.error);
    break;

  case 'token':
    saveToken();
    break;

  case 'help':
    printUsage();
    break;

  default:
    debug(`Unknown command "${command}" has passed`);
    console.log(red(' Unknown command'));
    printUsage();
}
