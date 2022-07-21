const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ').map(Number);

let xy = input.slice(0,2)
let wh = input.slice(2,4)
let zero = [0,0]
let answer = []

let  sub = [xy[0]-wh[0],xy[1]-wh[1],xy[0]-zero[0],xy[1]-zero[1]];

sub.forEach(x => answer.push(Math.abs(x)))

console.log(answer.sort((a,b) => a-b)[0])

/*
let [x,y,w,h] = input

console.log(Math.min(x,y,w-x,h-y))

*/


