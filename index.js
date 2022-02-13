#! /usr/bin/env node

import { saveToken, main, printUsage } from './command';
import { red } from './lib/colors';

const argv = process.argv.slice(2);
let command = argv.pop() ?? '';

switch (command.trim()) {
  // execute the main logic
  case '':
    main().catch(console.error);
    break;

  case 'token':
    saveToken();
    break;

  case 'help':
    printUsage();
    break;

  default:
    console.log(red(' Unknown command'));
    printUsage();
}
