const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

let [N,M,V] = input.shift().split(' ').map(Number)

let graph = new Array(N+1);

for(let i = 0 ; i<graph.length ; i++){
    graph[i] = [];
}

for(let i = 0; i<M ; i++){
    let [from, to] = input[i].split(' ').map(Number);
    
    
    graph[from].push(to)
    graph[to].push(from)
}

graph.forEach(el => {
    el.sort((a,b) => a-b);
})

let visited = new Array(N+1).fill(0)
let answer_dfs = [];

function DFS(V) {
    if(visited[V]) return;
    visited[V]=1;
    answer_dfs.push(V);
    for(let i=0 ; i<graph[V].length ; i++){
        let next = graph[V][i];
        if(visited[next] === 0){
            DFS(next);
        }
    
    }
}
DFS(V)
console.log(answer_dfs.join(' '))

let answer_bfs = []
visited.fill(0)

function BFS(V){
    let queue = [V];
    while(queue.length){
        let x = queue.shift();
        if(visited[x] === 1){
            continue;
        }
        visited[x] = 1;
        answer_bfs.push(x)
        for(let i = 0 ; i<graph[x].length ; i++){
            let next = graph[x][i];
            if(visited[next] === 0 )
            queue.push(next)
        }
    }
}

BFS(V)
console.log(answer_bfs.join(' '))