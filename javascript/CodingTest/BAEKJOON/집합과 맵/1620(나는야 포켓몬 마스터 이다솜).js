const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');



let [N,M] = input[0].split(' ').map(Number)
input.shift()
let arr = input.slice(0,N)
let poket = input.slice(N,N+M)

let map = new Map(arr.map((v,i) => [v,i+1]))
console.log(arr)
console.log(poket)
console.log(map)

poket.forEach(v => {
    
    console.log(Number.isNaN(+v)?map.get(v):arr[+v-1])
})
//console.log(N)
//console.log(M)


