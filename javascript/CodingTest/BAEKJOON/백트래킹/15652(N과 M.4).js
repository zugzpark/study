const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ')


let [n,m] = input.map(Number)


let visited = new Array(m)
let out = []
let answer = "";


function num(cnt){
    if(cnt === m){
        answer += `${out.join(' ')}\n`
        return;
    }


    for(let i=1; i<=n ; i++){
        if(visited[i]==true)continue

        out.push(i)
        
        num(cnt+1)
        visited[i]=true

        out.pop();
        visited[i+1]=false

    }
}

num(0)

console.log(answer)