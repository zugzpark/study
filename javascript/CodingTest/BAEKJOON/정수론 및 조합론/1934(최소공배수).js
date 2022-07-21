const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.shift();

for(let i=0; i<input.length ; i++){
    let [a,b] = input[i].split(' ').map(Number)
    let GCD = (a,b) => a%b===0?b:GCD(b,a%b)
    //console.log(GCD(a,b))
    let LCM = (a,b) => a*b /GCD(a,b)
    console.log(LCM(a,b))
    
}

