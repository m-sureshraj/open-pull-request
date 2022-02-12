#! /usr/bin/env node

import { init, main, printUsage } from './command';

const argv = process.argv.slice(2);
let command = argv.pop() ?? '';

switch (command.trim()) {
    // execute the main logic
    case '':
        main().catch(console.error);
        break;

    case 'init':
        init();
        break;

    default:
        printUsage();
}
