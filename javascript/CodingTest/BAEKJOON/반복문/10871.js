let input = require('fs').readFileSync('./예제.txt').toString().split('\n');

let num = input[0].split(' ').map(x => Number(x));
let arr = input[1].split(' ').map(x => Number(x));

let answer = [];


answer = arr.filter(x => num[1]>x)

console.log(answer.toString().replace(/,/gi,' '))