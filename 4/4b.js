const fs = require('fs');

const input = fs.readFileSync('./4.txt', 'utf8');

const lines = input.split(/\r?\n/);

let sum = lines.length;

let count = new Array(lines.length).fill(1);

for (const line of lines) {
  const [title, nums] = line.split(': ');
  const cardNum = parseInt(title.split(/\s+/)[1], 10);

  const [winning, own] = nums
    .split(' | ')
    .map((numList) => numList.trim().split(/\s+/));

  let matches = 0;
  for (const num of own) {
    if (winning.includes(num)) matches++;
  }

  if (matches > 0) {
    for (let i = 0; i < matches; i++) {
      count[cardNum + i] += count[cardNum - 1];
    }
    sum += count[cardNum - 1] * matches;
  }
}

console.log(sum);
