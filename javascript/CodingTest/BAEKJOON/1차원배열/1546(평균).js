const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.shift()

let num = input.toString().split(' ').map(Number);
let max = num.sort((a,b) => b-a)[0]
let sum = 0;
num.reduce((acc,val) => {
    //console.log(`acc = ${acc} val = ${val} max=${max}`)
    acc=val/max*100
    //console.log(`after acc = ${acc}`)
    return sum+=acc
},0)

console.log(sum/num.length)