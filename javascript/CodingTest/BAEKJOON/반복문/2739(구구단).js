let input = require('fs').readFileSync('./예제.txt').toString().split(" ").map(Number);


for(let i=1 ; i<=9 ; i++){
    console.log(`${input} * ${i} = ${input*i}`)
}