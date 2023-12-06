const fs = require('fs');

const input = fs.readFileSync('./6.txt', 'utf8');

const [times, dist] = input.split(/\r?\n/).map((line) =>
  line
    .split(/\s+/)
    .slice(1)
    .map((num) => parseInt(num, 10))
);

let sum = 1;

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const d = dist[i];
  /**
   * x - hold duration
   * (time-x)*x > d
   * time*x-x^2 - d > 0
   * x^2-time*x+d < 0 // b = -time
   * x1,2 = (-(-time)+-sqrt((-time)^2-4*d))/2
   * (x-x1)(x-x2) < 0
   * ans: (min(x1,x2), max(x1,x2))
   * or [floor(min(x1,x2))+1, ceil(max(x1,x2))-1] for whole integers
   * number of integers in the range is higherbound-lowerbound+1,
   * ceil(max(x1,x2))-1 - (floor(min(x1,x2))+1) + 1 =
   * = ceil(max(x1,x2)) + floor(min(x1,x2)) - 1
   */
  const x1 = (time + Math.sqrt(time * time - 4 * d)) / 2;
  const x2 = (time - Math.sqrt(time * time - 4 * d)) / 2;

  const xmin = Math.min(x1, x2);
  const xmax = Math.max(x1, x2);

  const numWays = Math.ceil(xmax) - Math.floor(xmin) - 1;
  sum *= numWays;
}

console.log(sum);
