const fs = require('fs');

const input = fs.readFileSync('./8.txt', 'utf8');

const [path, nodeLines] = input.split(/\r?\n\r?\n/);

const nodes = nodeLines.split(/\r?\n/).reduce((acc, line) => {
  const [curr, options] = line.split(' = ');
  acc[curr] = options.slice(1, -1).split(', ');
  return acc;
}, {});

let currNode = 'AAA';
let steps = 0;

let i = 0;
while (currNode !== 'ZZZ') {
  const choice = path[i % path.length] === 'L' ? 0 : 1;
  currNode = nodes[currNode][choice];
  i++;
  steps++;
}

console.log(steps);
