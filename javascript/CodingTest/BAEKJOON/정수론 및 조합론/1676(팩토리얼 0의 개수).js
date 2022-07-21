const input = require('fs').readFileSync('예제.txt').toString().trim();


let num = Number(input)


function fac(num){
    if(num<1){
        return 1
    }
    return num*fac(num-1)
}

