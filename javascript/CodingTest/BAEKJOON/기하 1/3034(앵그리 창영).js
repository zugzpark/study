const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

let [N,W,H] = input.shift().split(' ').map(Number);

let h = Math.sqrt(W**2+H**2)
//console.log(W)
//console.log(H)
//console.log(Math.sqrt(W**2+H**2))

for(let i=0; i<input.length ; i++){
    console.log(Number(input[i])<=h?"DA":"NE")
}