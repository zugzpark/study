const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');



let [N,n,M,m] = input
let obj = {}
let answer = []
let arr = n.split(' ').map(Number)
let card = m.split(' ').map(Number)

arr.forEach(x => {
    if(obj[x]){
        obj[x]++;
    } else {
        obj[x]=1;
    }
})

card.forEach(x => 
    answer.push(obj[x]?obj[x]:0)
)

console.log(answer.join(' '))