let input = require('fs').readFileSync('./예제.txt').toString();


let n = input*1
let newNum = "";
let cnt = 0;




while(input*1!==newNum){
    console.log(`${input}<>${newNum}`)
let oneNum = n%10;
let tenNum = Math.floor(n/10);

let sum = tenNum+oneNum;
    newNum = oneNum*10+(sum%10)
    console.log(` tenNum = ${tenNum} oneNum = ${oneNum}  sum = ${sum}  newNum = ${newNum} <> input = ${input}`)
    n = newNum;
    cnt++;
}

console.log(cnt)