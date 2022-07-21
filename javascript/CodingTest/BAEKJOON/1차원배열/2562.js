const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');


let arr = input.map(Number);
let max = arr.sort((a,b) => b-a)

console.log(max[0])
console.log(input.findIndex(x => x==max[0])+1)

// Math.max()