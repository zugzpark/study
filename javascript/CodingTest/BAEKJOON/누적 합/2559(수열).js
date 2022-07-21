const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');


let [N,K] = input[0].split(' ').map(Number)
//console.log(K)
input.shift()

let [...n] = input[0].split(' ').map(Number)

let answer = []
console.log(n)
//console.log(K)

for(let i = 0 ; i<n.length ; i++){
    console.log(n[i])
    
    
}