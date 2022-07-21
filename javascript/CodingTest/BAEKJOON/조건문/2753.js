const input = require('fs').readFileSync('./예제.txt')
let a = input;
let TF = 0;

if(a%4==0 && a%100!=0 || a%400==0){
         TF=1;
}
console.log(TF);