const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');
const a = parseInt(input[0]);
const b = parseInt(input[1]);

console.log(`a = ${a} b = ${b}`)
console.log(`100의자리=${b-b%100}   10의자리=${b%100-b%10} 1의자리 = ${b%10} `);

console.log(b%10*a);
console.log(((b%100-b%10)*a)/10);
console.log(((b-b%100)*a)/100);
console.log(a*b)


