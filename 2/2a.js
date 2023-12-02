const fs = require('fs');

const input = fs.readFileSync('./2.txt', 'utf8');

const lines = input.split(/\r?\n/);

const maxSet = {
  red: 12,
  green: 13,
  blue: 14,
};

let sum = 0;

for (const line of lines) {
  const [title, content] = line.split(': ');
  const id = title.split(' ')[1];
  const sets = content.split('; ');

  let possible = true;
  for (const set of sets) {
    if (!possible) break;

    const items = set.split(/,? /);
    for (let i = 1; i < items.length; i = i + 2) {
      const color = items[i];
      const quantity = items[i - 1];
      if (quantity > maxSet[color]) {
        possible = false;
        break;
      }
    }
  }
  if (possible) sum += parseInt(id, 10);
}

console.log(sum);
