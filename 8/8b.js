const fs = require('fs');

const input = fs.readFileSync('./8.txt', 'utf8');

const [path, nodeLines] = input.split(/\r?\n\r?\n/);

const nodes = nodeLines.split(/\r?\n/).reduce((acc, line) => {
  const [curr, options] = line.split(' = ');
  acc[curr] = options.slice(1, -1).split(', ');
  return acc;
}, {});

let currNodes = Object.keys(nodes).filter(
  (node) => node[node.length - 1] === 'A'
);
let zsteps = new Array(currNodes.length).fill(0);
let steps = 0;

let finished = false;
while (!finished) {
  const choice = path[steps % path.length] === 'L' ? 0 : 1;
  for (let i = 0; i < currNodes.length; i++) {
    currNodes[i] = nodes[currNodes[i]][choice];
    if (currNodes[i][currNodes[i].length - 1] === 'Z' && zsteps[i] === 0) {
      zsteps[i] = steps + 1;
    }
  }

  steps++;
  finished = zsteps.every((node) => node !== 0);
}

const lcm = (a, b) => {
  // find gcd
  let l = a;
  let r = b;
  while (r !== 0) {
    let temp = r;
    r = l % r;
    l = temp;
  }
  const gcd = l;
  return (a * b) / gcd;
};

console.log(zsteps.reduce((acc, val) => lcm(acc, val), 1));
