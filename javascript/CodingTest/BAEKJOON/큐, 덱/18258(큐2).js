const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.shift()

let answer = []
let num = 0
let queue = {
  push : answer.push(num),
  pop : answer.pop(),
  empty : answer.length,
  front : answer[0],
  back : answer[answer.length-1]
}


for(let i=0; i<input.length ; i++){
  console.log(input[i].split(' ')[0].replace('\r',''))
  num = input[i].split(' ')[1]

  queue.input[i].split(' ')[0].replace('\r','')
  console.log(answer)  
}

