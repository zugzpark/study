const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');
let n = parseInt(input[0]);
let star= "*";

for(let i=1 ; i<=n ; i++){
    
    console.log(star);
    star+="*"
}