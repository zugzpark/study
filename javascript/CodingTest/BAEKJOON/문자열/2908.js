const input = require('fs').readFileSync('./예제.txt').toString().trim().split('');


let dial = ['','','ABC','DEF','GHI','JKL','MNO','PQRS','TUV','WXYZ']

let answer = []


input.forEach(x => 

    answer.push(dial.findIndex(v => v.includes(x)))

)


//console.log(answer)

console.log(answer.reduce((acc,val) =>acc+=val+1,0))

//input.reduce((acc,val) => console.log(`acc = ${acc} val=${dial.indexOf(dial.split(",").filter(x=> num = x.includes(val)))}`))


//dial.indexOf(x => console.log(dial.includes('A')))
//console.log(dial[1])
//console.log(dial.split(','))
//console.log(dial.indexOf(dial.split(",").filter(x=> num = x.includes('D'))))


