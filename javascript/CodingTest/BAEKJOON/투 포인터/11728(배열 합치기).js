const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

input.shift()
let answer = []

for(let i=0; i<input.length ; i++){
    answer.push(input[i].split(' ').map(Number))
}

console.log(answer.toString().split(',').map(Number).sort((a,b) => a-b).join(' '))