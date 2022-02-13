import { hideCursor, showCursor, eraseLine, cursorLeft } from './util';
import { yellow } from './colors';

// https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export class Loader {
  constructor() {
    this.count = 0;
    this.intervalId = 0;
  }

  start() {
    hideCursor();
    this.intervalId = setInterval(() => {
      if (this.count === frames.length) {
        this.count = 0;
      }

      eraseLine();
      cursorLeft();
      process.stdin.write(yellow(frames[this.count]));
      this.count++;
    }, 80);
  }

  stop() {
    clearInterval(this.intervalId);
    eraseLine();
    cursorLeft();
    showCursor();
    this.intervalId = 0;
    this.count = 0;
  }
}
