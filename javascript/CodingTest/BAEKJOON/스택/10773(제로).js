const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.shift()
let answer = []

for(let i=0 ; i<input.length ; i++){ 
  input[i]==0?answer.pop():answer.push(input[i])
}

console.log(answer==""?0:answer.map(Number).reduce((acc,val) => acc+=val))