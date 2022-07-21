const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.shift()

let [a,b] = input
let A = a.split(' ').map(Number)
let B = b.split(' ').map(Number)
let sum = 0;
A.sort((a,b) => a-b)
B.sort((a,b) => b-a)

for(let i = 0; i<A.length ; i++){
    sum+=A[i]*B[i]
}
console.log(sum)
