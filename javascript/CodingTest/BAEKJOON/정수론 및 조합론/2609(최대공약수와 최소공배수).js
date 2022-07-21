const input = require('fs').readFileSync('예제.txt').toString().trim().split(' ').map(Number);



let [a,b] = input.sort((a,b) => a-b)


let GCD = (a,b) => (b>0?GCD(b,a%b):a);
let LCM = (a,b) => (a*b) / GCD(a,b)
console.log(GCD(a,b))
console.log(LCM(a,b))
