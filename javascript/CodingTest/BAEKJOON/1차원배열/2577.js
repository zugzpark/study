const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');


let [A,B,C] = input.map(Number);


let num = (A*B*C).toString();


for(let i=0; i<10 ; i++){
    let numI = new RegExp(i,'g')    
    console.log(num.match(numI)!=null?num.match(numI).length:0)
}



//split