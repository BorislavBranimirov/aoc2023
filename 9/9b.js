const fs = require('fs');

const input = fs.readFileSync('./9.txt', 'utf8');

const allValues = input
  .split(/\r?\n/)
  .map((line) => line.split(' ').map((v) => parseInt(v, 10)));
const previousValues = [];

for (const values of allValues) {
  const firstValues = [];
  let diff = values;
  let finished = false;
  while (!finished) {
    firstValues.push(diff[0]);

    const newDiff = [];
    for (let i = 1; i < diff.length; i++) {
      newDiff.push(diff[i] - diff[i - 1]);
    }
    diff = newDiff;
    finished = diff.every((v) => v === 0);
  }
  const previousValue = firstValues
    .reverse()
    .reduce((next, curr) => curr - next, 0);
  previousValues.push(previousValue);
}

console.log(previousValues.reduce((acc, v) => acc + v, 0));
