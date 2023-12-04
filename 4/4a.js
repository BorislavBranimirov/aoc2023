const fs = require('fs');

const input = fs.readFileSync('./4.txt', 'utf8');

const lines = input.split(/\r?\n/);

let sum = 0;

for (const line of lines) {
  const nums = line.split(': ')[1];
  const [winning, own] = nums
    .split(' | ')
    .map((numList) => numList.trim().split(/\s+/));

  let matches = 0;
  for (const num of own) {
    if (winning.includes(num)) matches++;
  }

  if (matches > 0) {
    sum += 2 ** (matches - 1);
  }
}

console.log(sum);
