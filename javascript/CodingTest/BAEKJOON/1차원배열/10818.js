const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

let arr = input[1].split(' ').map(Number);


let max = arr.reduce((acc, val) => {
    return acc>val?acc:val
})

let min = arr.reduce((acc, val) => {
    return acc<val?acc:val
})


console.log(`${min} ${max}`)

//sort