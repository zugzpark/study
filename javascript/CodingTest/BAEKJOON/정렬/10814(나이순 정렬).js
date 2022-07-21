const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')



input.shift()

let answer = []

for(let i=0 ;i<input.length ; i++){
    answer.push([input[i].split(' ').map(Number)[0],input[i].split(' ')[1]])
    
}

console.log(answer.sort((a,b) => a[0]-b[0]).join('\n').replace(/,/gi,' '))