const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');



let [N,n,M,m] = input


let card = n.split(' ').map(Number)
let cardTF = m.split(' ').map(Number)

let obj = {}
let answer = []

for(x of card){

    obj[x] = true
}


cardTF.forEach(x => answer.push(obj[x]!=undefined?1:0))

console.log(answer.join(' '))



