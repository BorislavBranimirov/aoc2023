const fs = require('fs');

const input = fs.readFileSync('./10.txt', 'utf8');

const lines = input.split(/\r?\n/).map((line) => line.split(''));

// (+) moving right/bottom; (-) moving left/top
const dirMap = {
  L: [0, -1],
  R: [0, 1],
  T: [-1, 0],
  B: [1, 0],
};

// direction to this tile -> direction to next tile
const tileMap = {
  '|': { B: 'B', T: 'T' },
  '-': { L: 'L', R: 'R' },
  L: { B: 'R', L: 'T' },
  J: { B: 'L', R: 'T' },
  7: { T: 'L', R: 'B' },
  F: { T: 'R', L: 'B' },
};

const findStartIndex = (lines) => {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === 'S') {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

const findFirstTile = (s) => {
  for (const dir in dirMap) {
    const yDelta = dirMap[dir][0];
    const xDelta = dirMap[dir][1];
    const nextTile = lines[s[0] + yDelta]?.[s[1] + xDelta];
    if (nextTile && tileMap[nextTile]?.[dir]) {
      return [[s[0] + yDelta, s[1] + xDelta], dir];
    }
  }
};

const s = findStartIndex(lines);

let [currPos, dir] = findFirstTile(s);
let steps = 1;
while (lines[currPos[0]][currPos[1]] !== 'S') {
  const tile = lines[currPos[0]][currPos[1]];
  dir = tileMap[tile][dir];
  currPos[0] += dirMap[dir][0];
  currPos[1] += dirMap[dir][1];
  steps++;
}

console.log(Math.floor(steps / 2));
