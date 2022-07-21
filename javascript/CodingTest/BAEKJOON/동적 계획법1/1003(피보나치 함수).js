const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

let length = input.shift()

for(let i = 0 ; i< length ; i++){
    let one = 0;
    let zero = 1;
    
    for(let j = 1 ; j<=input[i] ; j++){
        let tmp = zero;
        zero = one ;
        one = tmp + one
    }

    console.log(zero+" "+one)
}