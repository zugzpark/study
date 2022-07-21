const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');


let [a,b,c] = input.map(Number);


cnt=Math.floor(a/(c-b))
console.log(cnt>0?a+(b*cnt)>=c*cnt?cnt+1:cnt=-1:cnt=-1)
