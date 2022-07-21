const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.shift()



for(let i=0; i<input.length ; i++){
  console.log(input[i].split('')[0].f)
}