const input = require('fs').readFileSync('./예제.txt').toString();

let [n,k] = input.split(' ').map(Number)

answer = []

for(let i=1; i<=k ; i++){
    answer.push(Number((n*i).toString().split('').reverse().join('')))
}


console.log(Math.max(...answer))