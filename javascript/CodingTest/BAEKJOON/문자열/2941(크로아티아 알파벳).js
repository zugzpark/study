const input = require('fs').readFileSync('./예제.txt').toString().trim().split('');


let st = input.join(',').replace(/,/g,'')

let croa = ['c=','c-','dz=','d-','lj','nj','s=','z=']

croa.forEach(x => st=st.replace(new RegExp(x,'gi'),'*'))
console.log(st.length)


//