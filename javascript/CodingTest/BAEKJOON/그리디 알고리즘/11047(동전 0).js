const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

let k = Number(input.shift().split(' ')[1])


let [...coin] = input.map(Number)
let one = 0;
let max = 0;
let answer = 0;

while(k!=0){
    max = Math.max(...coin)
    if(max>k){
        coin.pop()
    } else {
        
        one = Math.floor(k/max)
        k = k-(one*max)
        answer += one
        //console.log(`one = ${one} max = ${max} k = ${k}`)
    }
}

console.log(answer)