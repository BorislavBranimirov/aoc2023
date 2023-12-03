const fs = require('fs');

const input = fs.readFileSync('./3.txt', 'utf8');

const lines = input.split(/\r?\n/);

const isSymbol = (ch) => {
  // return !/^(\d|\.)$/.test(ch);
  return ch && !(ch >= '0' && ch <= '9') && ch !== '.';
};

let sum = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let start = 0; start < line.length; start++) {
    const ch = line[start];
    if (ch >= '0' && ch <= '9') {
      let end = start;

      // get start and end coordinates of any found number
      while (line[end] >= '0' && line[end] <= '9') end++;

      let included = false;

      const prevLine = lines[i - 1];
      if (prevLine) {
        for (let j = start - 1; j <= end; j++) {
          if (isSymbol(prevLine[j])) {
            included = true;
            break;
          }
        }
      }
      if (!included && (isSymbol(line[start - 1]) || isSymbol(line[end]))) {
        included = true;
      }
      const nextLine = lines[i + 1];
      if (!included && nextLine) {
        for (let j = start - 1; j <= end; j++) {
          if (isSymbol(nextLine[j])) {
            included = true;
            break;
          }
        }
      }

      if (included) {
        sum += parseInt(line.slice(start, end), 10);
      }

      start = end - 1;
    }
  }
}

console.log(sum);
