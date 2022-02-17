import readline from 'readline';

import Conf from 'conf';

import { red } from '../lib/colors.js';
import { debug } from '../lib/util';

export function saveToken() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('❓ Github personal access token: ', token => {
    token = token.trim();

    if (token) {
      const config = new Conf();
      config.set('token', token);
      console.log('✅ Token successfully saved.');
      debug(`Token saved at ${config.path}`);
    } else {
      console.log(red('Invalid value provided'));
      debug({ token });
    }

    rl.close();
  });
}
