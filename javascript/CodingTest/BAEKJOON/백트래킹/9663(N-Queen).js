const input = require('fs').readFileSync('./예제.txt').toString()

console.log(Number(input))

let N = Number(input)

let visited = new Array(N)
console.log(visited)
let out = []

/*

0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0

*/