const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');
let n = parseInt(input[0]);

let star= "*";
let blank="";



for(let i=n-1 ; i>=0 ; i--){
    console.log(i + " / " + (n-i) )
    blank+=" ";
    for(let j=1 ; j<=(n-i); j++){
        answer=star+"*"
    }
    console.log(blank+star)
}


// 공백을 4 3 2 1 0 후에 * 를 i만큼 찍음