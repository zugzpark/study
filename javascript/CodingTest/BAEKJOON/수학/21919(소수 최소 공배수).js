const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.shift();

let [...num] = input[0].split(' ').map(Number)
let answer = []

//console.log(num)

let array = new Array(num[num.length-1]).fill(true).fill(false,0,2)

for(let i =2 ; i*i <=num[num.length-1] ; i++){
    if(array[i]){
        for(let j=i*i ; j<=num[num.length-1] ; j+=i){
            array[j]=false
        }
    }
}

num.forEach(x => {
    if(array[x]){
        answer.push(x)
    }
})
//console.log(answer)
console.log(answer.length==0?-1:answer.reduce((acc,val) => acc*=val))