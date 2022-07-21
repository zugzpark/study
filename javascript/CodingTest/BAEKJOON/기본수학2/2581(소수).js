const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n').map(Number);

answer = [];

for(let i=input[0] ; i<=input[1] ; i++){

    i!=1?answer.push(i):answer
    for(let j=2 ; j<=Math.ceil(Math.sqrt(i)) ; j++){
        
        if(i%j===0){
            answer.pop()
            break;
        }
    }
    

}

answer.length>0?console.log(answer.reduce((acc, val) => acc+=val)+"\n"+answer.sort((a,b) => a-b)[0]):console.log(-1)
