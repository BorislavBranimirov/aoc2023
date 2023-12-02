const fs = require('fs');

const input = fs.readFileSync('./1.txt', 'utf8');

const lines = input.split(/\r?\n/);

let sum = 0;

for (const line of lines) {
  let firstDigit = null,
    lastDigit;
  for (const ch of line) {
    if (ch >= '0' && ch <= '9') {
      if (firstDigit === null) {
        firstDigit = ch;
      }
      lastDigit = ch;
    }
  }
  sum += parseInt(firstDigit + lastDigit, 10);
}

console.log(sum);
