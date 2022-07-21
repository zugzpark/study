const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');


let word = input.toString().toUpperCase().split('')



let result = word.reduce((acc,val) => {
    acc[val] = (acc[val] || 0) +1
    return acc
},{})

let answer =Object.entries(result).sort((a,b) => b[1]-a[1])


console.log(answer.length!=1?answer[0][1]==answer[1][1]?"?":answer[0][0]:answer[0][0])