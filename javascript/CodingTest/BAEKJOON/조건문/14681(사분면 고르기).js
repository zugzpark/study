const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

let [x,y] = input.map(Number)

let answer = 0;


if(x*y>0){
    answer = 1;
    if(y<0){
        answer = 3;
    }
} else {
    answer = 2;
    if(y<0){
        answer = 4;
    }
} 

console.log(answer)