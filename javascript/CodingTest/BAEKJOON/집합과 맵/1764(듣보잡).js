const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

let [N,M] = input.shift().split(' ').map(Number)


let set = new Set();
let answer = []


for(let i=0; i<input.length ; i++){
    console.log("===>>" + input[i])
    if(i<N){
        set.add(input[i])
    } else if(set.has(input[i])) {        
        answer.push(input[i])
    }
}
answer.sort()
console.log(answer.length+"\n"+answer.join('\n'))