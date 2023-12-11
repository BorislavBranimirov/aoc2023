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

const fillBoundaryMap = (map, y, x) => {
  if (map[y]) {
    for (let i = 0; i < map[y].length; i++) {
      if (map[y][i] > x) {
        map[y].splice(i, 0, x);
        return;
      }
    }
    map[y].push(x);
  } else {
    map[y] = [x];
  }
};

const s = findStartIndex(lines);

let [currPos, dir] = findFirstTile(s);
const boundaryMap = { [currPos[0]]: [currPos[1]] }; // track pipe coordinates
let steps = 1;
while (lines[currPos[0]][currPos[1]] !== 'S') {
  const tile = lines[currPos[0]][currPos[1]];
  dir = tileMap[tile][dir];
  currPos[0] += dirMap[dir][0];
  currPos[1] += dirMap[dir][1];
  steps++;
  fillBoundaryMap(boundaryMap, currPos[0], currPos[1]);
}

let insideSpace = 0;
let connectedTiles = ['|', 'L', 'J'];
for (const key in boundaryMap) {
  const row = boundaryMap[key];
  let skip = true; // skip counting if outside loop
  for (let i = 1; i < row.length; i++) {
    while (lines[key][row[i - 1]] === '-') i++;
    if (connectedTiles.includes(lines[key][row[i - 1]])) {
      skip = !skip;
    }
    if (!skip) {
      // calculate the space between the pipe tiles on each row if inside loop
      insideSpace += row[i] - row[i - 1] - 1;
    }
  }
}
console.log(insideSpace);
