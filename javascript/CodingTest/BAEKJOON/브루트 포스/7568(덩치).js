const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

let arr = new Array(2)
let answer =  [];
let cnt = 1;

for(let i=1 ; i<input.length ; i++){

  arr[i-1]=input[i].split(' ').map(Number)
  
}

for(let j=0 ; j<arr.length ; j++){
  cnt = 1;
  for(let k=0 ; k<arr.length ; k++){
 
    if(k==j){
      continue;
    } else {
      
     
      if(arr[j][0]<arr[k][0] && arr[j][1]<arr[k][1]){
          cnt++
      }
      
    }
    
  }
  answer.push(cnt)
  
}

console.log(answer.join(' '))