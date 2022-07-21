var fs = require('fs');
const input = require('fs').readFileSync('예제.txt').toString().trim().split(' ');
var a = parseInt(input[0]);
var b = parseInt(input[1]);

console.log(a+b);
console.log(a-b);
console.log(a*b);
console.log(parseInt(a/b));
console.log(a%b);
