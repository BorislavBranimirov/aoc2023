const fs = require('fs');

const input = fs.readFileSync('./5.txt', 'utf8');

const [seedSection, ...sections] = input
  .split(/\r?\n\r?\n/)
  .map((section) => section.split(/:(?: |\r?\n)/)[1]);

const ids = seedSection.split(' ').map((num) => parseInt(num, 10));

for (const section of sections) {
  const ranges = section.split(/\r?\n/);

  const idMap = [];
  for (const range of ranges) {
    const [destStart, srcStart, rangeLength] = range
      .split(' ')
      .map((num) => parseInt(num, 10));
    idMap.push({
      start: srcStart,
      end: srcStart + rangeLength - 1,
      diff: destStart - srcStart,
    });
  }

  for (let i = 0; i < ids.length; i++) {
    for (const idMapping of idMap) {
      if (ids[i] >= idMapping.start && ids[i] <= idMapping.end) {
        ids[i] += idMapping.diff;
        break;
      }
    }
  }
}

console.log(Math.min(...ids));
