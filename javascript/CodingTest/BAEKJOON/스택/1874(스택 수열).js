const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');





let nArr = input.map(Number)
//let arr = new Array(n).fill().map((v, i) => i+1)
let stack = []
let answer = ""
let cnt = 1;
//console.log(arr)

for(let i=0 ; i<nArr.length ; i++){
  

  while(cnt<=nArr[i]){

    stack.push(cnt++)
    
    answer+="+\n";
  }
  //console.log(nArr[i] + " <> " + stack[stack.length-1])
  if(stack.pop()!=nArr[i]){
    answer ="NO";
    break;
  } else {
    answer +='-\n';
  }

}

console.log(answer)