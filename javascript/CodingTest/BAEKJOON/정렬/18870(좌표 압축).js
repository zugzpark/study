const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

input.shift()

let num = input.toString().split(' ').map(Number)
let empty = num.slice()
let answer = [];
let obj = {};

let findIdx = [...new Set(empty.sort((a,b) => a-b))]



findIdx.forEach((x,i) => obj[x]=i)

num.forEach(x => answer.push(obj[x]))



console.log(answer.join(' '))