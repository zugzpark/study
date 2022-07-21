const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.pop()

for(let i=0; i<input.length ; i++){
    let [a,b,c] = input[i].split(' ').map(Number).sort((a,b) => a-b)
    console.log(a*a+b*b==c*c?"right":"wrong")
}