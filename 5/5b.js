const fs = require('fs');

const input = fs.readFileSync('./5.txt', 'utf8');

const [seedSection, ...sections] = input
  .split(/\r?\n\r?\n/)
  .map((section) => section.split(/:(?: |\r?\n)/)[1]);

let idRanges = [];
const seedItems = seedSection.split(' ').map((num) => parseInt(num, 10));
for (let i = 0; i < seedItems.length; i = i + 2) {
  let seedStart = seedItems[i];
  let seedRangeLength = seedItems[i + 1];
  idRanges.push([seedStart, seedStart + seedRangeLength - 1]);
}

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

  const newIdRanges = [];
  for (let j = 0; j < idRanges.length; j++) {
    let matched = false;
    for (const idMapping of idMap) {
      if (
        idMapping.start <= idRanges[j][0] &&
        idMapping.end >= idRanges[j][1]
      ) {
        // mapping covers the range
        newIdRanges.push([
          idRanges[j][0] + idMapping.diff,
          idRanges[j][1] + idMapping.diff,
        ]);
        matched = true;
        break;
      }

      let extractStart = null;
      let extractEnd = null;
      if (
        idMapping.start >= idRanges[j][0] &&
        idMapping.start <= idRanges[j][1]
      ) {
        extractStart = idMapping.start;
      }
      if (idMapping.end >= idRanges[j][0] && idMapping.end <= idRanges[j][1]) {
        extractEnd = idMapping.end;
      }

      if (extractStart !== null && extractEnd !== null) {
        // mapping is within the range
        newIdRanges.push([
          extractStart + idMapping.diff,
          extractEnd + idMapping.diff,
        ]);
        if (idRanges[j][1] - extractEnd !== 0) {
          idRanges.push([extractEnd + 1, idRanges[j][1]]);
        }
        if (extractStart - idRanges[j][0] !== 0) {
          idRanges.push([idRanges[j][0], extractStart - 1]);
        }
        matched = true;
        break;
      } else if (extractStart !== null) {
        // mapping's start is within the range and end is outside it
        newIdRanges.push([
          extractStart + idMapping.diff,
          idRanges[j][1] + idMapping.diff,
        ]);
        if (extractStart - idRanges[j][0] !== 0) {
          idRanges.push([idRanges[j][0], extractStart - 1]);
        }
        matched = true;
        break;
      } else if (extractEnd !== null) {
        // mapping's end is within the range and start is outside it
        newIdRanges.push([
          idRanges[j][0] + idMapping.diff,
          extractEnd + idMapping.diff,
        ]);
        if (idRanges[j][1] - extractEnd !== 0) {
          idRanges.push([extractEnd + 1, idRanges[j][1]]);
        }
        matched = true;
        break;
      }
    }
    if (!matched) {
      // mapping is outside the range
      newIdRanges.push(idRanges[j]);
    }
  }
  idRanges = newIdRanges;
}

console.log(Math.min(...idRanges.map((range) => range[0])));
