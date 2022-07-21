const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')



input.shift()
let answer = []

for(let i=0; i<input.length ; i++){
    answer.push(input[i].split(' ').map(Number))
}

console.log(answer.sort((a,b) => {
    if(a[1]==b[1]){
        return a[0]-b[0]
    }
    return a[1]-b[1]

}).join('\n').replace(/,/gi,' '))