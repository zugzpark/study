let input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

let [p,s] = input


answer = 0;


for(let i=0 ; i<p.length ; i++){
    if((p.slice(i,i+s.length)==s)){
        answer = 1;
        break;
    } 
}

console.log(answer)