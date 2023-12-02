const fs = require('fs');

const input = fs.readFileSync('./2.txt', 'utf8');

const lines = input.split(/\r?\n/);

let sum = 0;

for (const line of lines) {
  const [_, content] = line.split(': ');
  const sets = content.split('; ');

  const maxSet = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const set of sets) {
    const items = set.split(/,? /);
    for (let i = 1; i < items.length; i = i + 2) {
      const color = items[i];
      const quantity = parseInt(items[i - 1]);
      if (quantity > maxSet[color]) {
        maxSet[color] = quantity;
      }
    }
  }

  // sum += Object.values(maxSet).reduce((power, curr) => power * curr, 1);
  sum += maxSet['red'] * maxSet['green'] * maxSet['blue'];
}

console.log(sum);
