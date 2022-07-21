const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ').map(Number);

let n = input[0]
let m = input[1]

let answer = "";
let out = [];
let visited = new Array(n)


function num(cnt){
    
    if(cnt === m ){
        
        answer+=`${out.join(' ')}\n`
        return
    }
    
    for(let i=0 ; i<n ; i++){
        
        if(visited[cnt+1]===true)continue


        visited[cnt+1] = true

        out.push(i+1);
 
        num(cnt+1)
     
        out.pop();
        visited[cnt+1]=false
        
    }
    
}


num(0)

console.log(answer)