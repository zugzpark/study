const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

input.shift()


let heap = new Array(input.length)
console.log(input.map(Number))