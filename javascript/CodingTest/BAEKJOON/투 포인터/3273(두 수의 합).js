const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

input.shift();

let num = input[0].split(' ').map(Number)
num.sort((a,b) => a-b)

let answer = 0;
let start = 0
let end = num.length-1
let sum = 0;

let x = Number(input[1])

while ( start < end ){
    sum = num[start] + num[end]
    //console.log(`sum = ${sum} num[start]=${num[start]} <> num[end]=${num[end]}`)
    if(sum == x){
        answer++
    }

    if(sum <=x){
        start++
    } else {
        end--;
    }

}



console.log(answer)