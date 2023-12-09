const fs = require('fs');

const input = fs.readFileSync('./9.txt', 'utf8');

const allValues = input
  .split(/\r?\n/)
  .map((line) => line.split(' ').map((v) => parseInt(v, 10)));
const nextValues = [];

for (const values of allValues) {
  const lastValues = [];
  let diff = values;
  let finished = false;
  while (!finished) {
    lastValues.push(diff[diff.length - 1]);

    const newDiff = [];
    for (let i = 1; i < diff.length; i++) {
      newDiff.push(diff[i] - diff[i - 1]);
    }
    diff = newDiff;
    finished = diff.every((v) => v === 0);
  }
  const nextValue = lastValues.reduce((next, curr) => next + curr, 0);
  nextValues.push(nextValue);
}

console.log(nextValues.reduce((acc, v) => acc + v, 0));
