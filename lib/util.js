export function removeNewLine(str) {
  return str.replace(/\r?\n|\r/g, '');
}

export function hideCursor() {
  process.stdout.write('\u001B[?25l');
}

export function showCursor() {
  process.stdout.write('\u001B[?25h');
}

export function eraseLine() {
  process.stdout.write('\u001B[2K');
}

export function cursorLeft() {
  process.stdout.write('\u001B[G');
}

export function debug(...rest) {
  process.env.DEBUG_OP && console.log(...rest);
}
