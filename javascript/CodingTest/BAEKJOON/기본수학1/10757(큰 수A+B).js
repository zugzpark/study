const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');


let A = BigInt(input[0]);
let B = BigInt(input[1]);
console.log((A+B).toString())


//BigInt