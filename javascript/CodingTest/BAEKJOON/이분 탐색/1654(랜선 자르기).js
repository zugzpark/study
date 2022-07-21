const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

let [k,n] =input.shift().split(' ').map(Number)
let cnt = 0 ;
console.log(input.map(Number))

let num = input.map(Number).reduce((acc,val) => acc+=val)
console.log(n)

let answer = num/n
console.log(num/n)
for(let i = 0 ; i<input.length ; i++){
    let line = Number(input[i])
    console.log(line)
    console.log(typeof Math.floor(line/answer))
    console.log(typeof line)
    console.log(typeof answer)
    if(Math.floor(line/answer)!=Number){
        answer=answer-(Math.floor(answer/10)/n)
        console.log("answer == " + answer)
        i--
    }
    
}
