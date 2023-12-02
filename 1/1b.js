const fs = require('fs');

const input = fs.readFileSync('./1.txt', 'utf8');

const lines = input.split(/\r?\n/);

const numMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const numWords = Object.keys(numMap);

let sum = 0;

for (const line of lines) {
  let firstDigit = null,
    lastDigit;
  for (let i = 0; i < line.length; i++) {
    let num = null;

    if (line[i] >= '0' && line[i] <= '9') {
      num = line[i];
    } else {
      for (const word of numWords) {
        if (line[i] === word[0] && line.slice(i, i + word.length) === word) {
          num = numMap[word];
        }
      }
    }

    if (num === null) continue;

    if (firstDigit === null) {
      firstDigit = num;
    }
    lastDigit = num;
  }
  sum += parseInt(firstDigit + lastDigit, 10);
}

console.log(sum);
