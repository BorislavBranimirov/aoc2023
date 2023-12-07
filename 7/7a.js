const fs = require('fs');

const input = fs.readFileSync('./7.txt', 'utf8');

const hands = input.split(/\r?\n/).map((line) => line.split(' '));

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const cardsObj = cards.reduce((obj, curr, idx) => {
  obj[curr] = idx;
  return obj;
}, {});

// 5x, 4x+y, 3x+2y, 3x+y+z, 2x+2y+z, 2x+y+z+w, x+y+z+w+v
const types = ['5', '41', '32', '311', '221', '2111', '11111'];

const findType = (s) => {
  const count = {};
  for (const ch of s) {
    count[ch] = count[ch] ? count[ch] + 1 : 1;
  }

  const type = Object.values(count)
    .sort((a, b) => b - a)
    .join('');
  return types.indexOf(type);
};

hands.forEach((arr) => arr.push(findType(arr[0])));

hands.sort((a, b) => {
  // if same types
  if (a[2] === b[2]) {
    for (let i = 0; i < 5; i++) {
      const leftIdx = cardsObj[a[0][i]];
      const rightIdx = cardsObj[b[0][i]];
      if (leftIdx !== rightIdx) {
        return rightIdx - leftIdx;
      }
    }
  }

  return b[2] - a[2];
});

console.log(hands.reduce((sum, curr, idx) => sum + curr[1] * (idx + 1), 0));
