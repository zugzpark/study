const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n').map(Number);

let length = input.shift();
//console.log(length)
//console.log(input)
let answer = []

for(let i=2 ; i<input[input.length-1] ; i++){
    let arr = []
    for(let j=0 ; j<input.length ; j++){
        console.log(`i = ${i}  j = ${j} input[j]%i = ${input[j]%i} input[j] = ${input[j]}`)
        let num = input[j]%i

        if(arr[0]==null){

        arr.push(num)

        } else {
            if(arr[0]==num){
                arr.push(num)
            } else {
                while(arr.length==0){
                    arr.pop();
                }
                break;
            } 
        } 
        
        console.log(arr) 
    }
    if(arr.length==length){
        answer.push(i)
    }
}

console.log(answer.join(' '))
//obj[3] = 6

