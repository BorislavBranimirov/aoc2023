const fs = require('fs');

const input = fs.readFileSync('./3.txt', 'utf8');

const lines = input.split(/\r?\n/);

let sum = 0;

const extractNum = (line, pos) => {
  let start = pos,
    end = pos;
  while (line[start] >= '0' && line[start] <= '9') start--;
  while (line[end] >= '0' && line[end] <= '9') end++;
  return [parseInt(line.slice(start + 1, end), 10), end - 1];
};

const addNum = (nums, line, pos) => {
  if (!(line[pos] >= '0' && line[pos] <= '9')) {
    return pos;
  }

  const [num, end] = extractNum(line, pos);
  nums.push(num);
  return end;
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === '*') {
      let nums = [];
      let prevLine = lines[i - 1];
      if (prevLine) {
        let end = addNum(nums, prevLine, j - 1);
        if (j > end) {
          end = addNum(nums, prevLine, j);
        }
        if (j + 1 > end) {
          addNum(nums, prevLine, j + 1);
        }
      }

      addNum(nums, line, j - 1);
      addNum(nums, line, j + 1);

      let nextLine = lines[i + 1];
      if (nextLine) {
        let end = addNum(nums, nextLine, j - 1);
        if (j > end) {
          end = addNum(nums, nextLine, j);
        }
        if (j + 1 > end) {
          addNum(nums, nextLine, j + 1);
        }
      }

      if (nums.length >= 2) {
        sum += nums.reduce((s, v) => s * v);
      }
    }
  }
}

console.log(sum);
