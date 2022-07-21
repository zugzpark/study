const input = require('fs').readFileSync('./예제.txt').toString()


let num = parseInt(input)


function fibo(num){
    
    if(num==0) return 0;
    if ( num==1 || num==2 ) return 1;
    else return fibo(num-1)+fibo(num-2)
}


console.log(fibo(num))