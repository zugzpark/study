const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ').map(Number);


let n = input[0]
let m = input[1]

//console.log(` n = ${n} m = ${m}`)

let answer = "";
let out = []
let visited = new Array(n);


function num(index,cnt){
    
    if(cnt === m){
        
        answer+=`${out.join(' ')}\n`;
        return;
    }

    for(let i=index ; i<n ; i++){
        if(visited[i]===true)continue;

        visited[i]=true;
        
        
        out.push(i+1);
       
        num(i,cnt+1);

        out.pop();
        visited[i]=false;
        
    }
    
}

num(0,0)
console.log(answer)