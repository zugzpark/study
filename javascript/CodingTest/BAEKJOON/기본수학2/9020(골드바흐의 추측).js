const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n').map(Number);

input.shift()


input.forEach(x => {

    let answer = []
    let arr = []
    let sub = 0;
    let empty = "";
    console.log(x)
    for(let i=2; i<x ; i++){
      //console.log("  > " + i + "  <> "  + Math.ceil(Math.sqrt(i)))
      arr.push(i)
      
      for(let j=2; j<=Math.ceil(Math.sqrt(i));  j++){
            
            if(i%j==0){
                arr.pop();
                break;
            }
      }
      
    }
    console.log(arr)
    for(let k=0; k<arr.length; k++){
        for(let l=k ; l<arr.length; l++){
            
            if(arr[k]+arr[l]==x){
             sub = Math.abs(arr[k]-arr[l]) 
             
             
             if(answer.length>0 && sub<empty){
                answer.pop()
             }
            
             answer.push(arr[k]+" "+arr[l])
             
             
             empty=sub
            }
        }
    }
    console.log(answer.join(' '))
})

// 에라토스테네스의 체