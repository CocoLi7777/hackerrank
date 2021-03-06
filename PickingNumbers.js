'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'pickingNumbers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function pickingNumbers(a) {
  // Write your code here
  const count = a
    .sort((a, b) => a - b)
    .reduce((map, val) => {
      map[val] = map[val] ? map[val] + 1 : 1;
      map[val - 1] = map[val - 1] ? map[val - 1] + 1 : undefined;
      return map;
    }, {});
  return Object.values(count).sort((a, b) => b - a)[0];
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const a = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((aTemp) => parseInt(aTemp, 10));

  const result = pickingNumbers(a);

  ws.write(result + '\n');

  ws.end();
}
