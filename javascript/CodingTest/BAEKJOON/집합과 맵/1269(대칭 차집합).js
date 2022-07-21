const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.shift()
let [a,b] = input
let A = a.split(' ').map(Number)
let B = b.split(' ').map(Number)



let over = A.length+B.length-new Set(A.concat(B)).size

console.log((A.length-over)+(B.length-over))