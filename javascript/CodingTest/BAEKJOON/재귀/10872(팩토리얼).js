const input = require('fs').readFileSync('./예제.txt').toString()


let num = parseInt(input)
//console.log(num)


function fac(num){
    
    if(num<1){
        return 1;
    }

    return num*fac(num-1)
}

console.log(fac(num))