const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');
let a = parseInt(input[0]);
let b = parseInt(input[1]);

console.log(`a = ${a} b =${b}`)
console.log((a==b)?"==":(a>b)?">":"<");