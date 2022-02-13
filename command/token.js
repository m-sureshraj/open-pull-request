import readline from 'readline';

import Conf from 'conf';

import { red } from '../lib/colors.js';

export function saveToken() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // todo: add a small description about why the personal access token is required.
  rl.question('❓ Github personal access token: ', token => {
    token = token.trim();

    if (token) {
      const config = new Conf();
      config.set('token', token);
      console.log('✅ Token successfully saved.');
    } else {
      console.log(red('Invalid value provided'));
    }

    rl.close();
  });
}
