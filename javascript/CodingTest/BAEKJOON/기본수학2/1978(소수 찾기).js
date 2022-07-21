const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

console.log(input[1].split(' ').filter(x => 
    {
        if(x==1){
            return false;
        }
        for( let i=2; i<x; i++){
                if(x % i ===0){
                return false;  
                }         
        }
        return true;
    }).length)