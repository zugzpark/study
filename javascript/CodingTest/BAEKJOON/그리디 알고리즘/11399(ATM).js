const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.shift()

let answer = 0
let idx = [];
let n = input[0].split(' ').map(Number).sort((a,b) => a-b)



for(let i=0 ; i<n.length ; i++){
    
    idx.push(i)
    
    idx.forEach(x => answer+=n[x])
}

console.log(answer)
