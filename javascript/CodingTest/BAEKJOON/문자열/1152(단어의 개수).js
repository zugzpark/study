const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');

console.log(input.filter(x => x))