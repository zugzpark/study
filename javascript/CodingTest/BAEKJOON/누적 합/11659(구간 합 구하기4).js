const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');


let [...n] = input[0].split(' ').map(Number)
input.shift()
let answer = []
let cumsum = [0]

n.reduce((acc,val) => {
    
    acc+=val;
    cumsum.push(acc)
    return acc
},0)


for(let i=0; i<input.length ; i++){

    let [j,k] = input[i].split(' ').map(Number)
    answer.push(cumsum[k]-cumsum[j-1])
    
}
console.log(answer.join('\n'))
