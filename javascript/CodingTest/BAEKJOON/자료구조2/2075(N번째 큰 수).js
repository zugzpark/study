const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

let N = input.shift()
let answer = []

//console.log(N)

for(let i=0 ; i<input.length ; i++){
    answer = answer.concat(input[i].split(' ').map(Number))
}


answer.sort((a,b) => a-b)
console.log(answer[answer.length-N])