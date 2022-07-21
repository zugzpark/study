const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');


let answer = []
let xy = []
input.forEach((x,i) => {
    
    
    xy.push([i,x.indexOf(0)])
    })


console.log(answer)

console.log(xy)
console.log(" >> " + answer)

console.log()