const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');



input.shift()

console.log(input.sort((a,b) => a-b).join('\n'))
