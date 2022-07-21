const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n').map(Number)

input.shift()

let avg = Math.round(input.reduce((acc,val) => acc+=val)/input.length)
console.log(avg==-0?0:avg)

let input2 = input.slice();

console.log(input2.sort((a,b) => a-b)[Math.floor(input2.length/2)])


//console.log(" ? = " + input)
let result = input.reduce((acc,val) => {
    acc[val] = (acc[val] || 0) +1;
    return acc
}, {})


let answer = Object.entries(result).sort((a,b) => {
        console.log(`b[1] = ${b[1]} a[1] = ${a[1]}`)
        
        return a[1]==b[1]?a[0]-b[0]:b[1]-a[1]
           
})

console.log(answer.length!=1?answer[0][1]==answer[1][1]?answer[1][0]:answer[0][0]:answer[0][0])
//answer.length!=1?answer[0][1]==answer[1][1]?answer[1][0]:answer[0][0]:answer[0][0]
console.log(Math.abs(input2[0]-input2[input2.length-1]))