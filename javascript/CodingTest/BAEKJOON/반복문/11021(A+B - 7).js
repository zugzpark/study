const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.shift()

let answer = []

for(let i=0 ; i<input.length ; i++){
    answer.push(input[i].split(' ').map(Number).reduce((acc,val) => acc+=val))
}


for(let i=0; i<answer.length ; i++){
    console.log(`Case #${i+1}: ${answer[i]}`)
}