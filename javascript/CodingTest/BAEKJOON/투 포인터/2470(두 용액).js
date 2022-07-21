const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

input.shift();

let n = input[0].split(' ').map(Number)
n.sort((a,b) => a-b)

let answer = []

let start = 0;
let end = n.length-1;
let sum = 0;


while(start < end ){
    sum = n[start] + n[end]
    //console.log(`sum = ${sum} n[start]=${n[start]} <> n[end]=${n[end]}`)
    answer.push([Math.abs(sum),`${n[start]} ${n[end]}`])
    if(sum>0){
        end--
    } else {
        start++
    }
    
}
answer.sort((a,b) => a[0]-b[0])

console.log(answer[0][1])