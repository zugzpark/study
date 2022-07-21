const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

let n = input;
function fib(n){
    if(n==1 || n==2) return 1; 
    
    return (fib(n-1) + fib(n-2));
    
}


function fibo(n){
    fib(n)
}