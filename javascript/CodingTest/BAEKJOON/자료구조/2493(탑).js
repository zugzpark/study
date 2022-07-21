const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

input.shift()

let top = input[0].split(' ').map(Number)
let answer = []
let idx = 0;
//console.log(top)

for(let i=top.length-1 ; i>=0 ; i--){
    //console.log(top[i])
    let index = i-1;
    while(index>=-1){
        
        //console.log(`top[i] = ${top[i]}  top[index--] = ${top[index]}`)
        
        
        if(top[i]<=top[index]){
           
            
            answer.push(index+1)
            break;
        } else if(index<0){
            answer.push(0)
        }

        index--;
        
    }
}

console.log(answer.reverse().join(' '))