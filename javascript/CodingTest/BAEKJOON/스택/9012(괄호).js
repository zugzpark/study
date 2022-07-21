const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.shift()
//console.log(input)

for(let i=0 ; i<input.length ; i++){
  //console.log("while 전 -->"+input[i])
  input[i] = input[i].replace(/\r/g,'')
  while(input[i].includes('()')){
    input[i] = input[i].replace("()",'')
  }
  //console.log("while 후 -->>"+input[i])
  console.log(input[i].length==0?"YES":"NO")
}