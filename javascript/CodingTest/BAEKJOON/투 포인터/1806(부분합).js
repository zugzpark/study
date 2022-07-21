const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

let [N,S] = input.shift().split(' ').map(Number);

let num = input[0].split(' ').map(Number)

let start = 0;
let end = 0;

let answer = [];
let sum = 0;
// 5, 1, 3, 5, 10,
// 7, 4, 9, 2,  8
console.log(num)
while(start<=num.length && end<num.length){
   
    sum+=num[end]
    console.log(`num[start] = ${num[start]} num[end] = ${num[end]} length = ${end-start+1}`)
    console.log(`sum = ${sum} <->  S = ${S}`)
    if(sum>=S){
        answer.push(end-start+1)
        sum-=num[start]
        sum-=num[end]
        start++
        
    } else if(sum<S){
        end++ 
    }
}
console.log(answer)
console.log(answer.length!=0?Math.min(...answer):0)