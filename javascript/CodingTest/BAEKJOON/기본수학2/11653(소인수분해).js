const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n').map(Number);


let num = input[0]
let answer = [];

for(let i=2; i<=num;i++){
    if(num%i==0){
        num=num/i
        //console.log(i +" >> " + num)
        answer.push(i)
        i--;
    }
}

console.log(answer.sort((a,b) => a-b).join('\n'))