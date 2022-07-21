const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')



let [N,d,k,c] = input[0].split(' ').map(Number)
input.shift()
let dish = input.map(Number)
console.log(dish)

let answer = 0;
let start = 0;
let end = start+4

for(start; start<end ; start++){
    console.log(dish[start])
    if(start-1==end){
        end++
    }
    
    
}