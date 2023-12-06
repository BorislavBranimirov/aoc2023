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
  for (const idRange of idRanges) {
    let matched = false;
    for (const idMapping of idMap) {
      if (idMapping.start <= idRange[1] && idMapping.end >= idRange[0]) {
        // mapping has at least one end inside the range
        if (idMapping.start > idRange[0]) {
          // range on the left of mapping
          idRanges.push([idRange[0], idMapping.start - 1]);
        }
        if (idMapping.end < idRange[1]) {
          // range on the right of mapping
          idRanges.push([idMapping.end + 1, idRange[1]]);
        }

        // mapping within the range
        let extractStart = Math.max(idRange[0], idMapping.start);
        let extractEnd = Math.min(idRange[1], idMapping.end);
        newIdRanges.push([
          extractStart + idMapping.diff,
          extractEnd + idMapping.diff,
        ]);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // mapping is outside the range
      newIdRanges.push(idRange);
    }
  }
  idRanges = newIdRanges;
}

console.log(Math.min(...idRanges.map((range) => range[0])));
