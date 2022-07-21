const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.forEach(x => { 
        
    let a = x.split(' ')[0];
    let b = x.split(' ')[1];
    
    
    if(a!=0){console.log((a*1+b*1))}
})