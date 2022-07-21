const { deflateSync } = require('zlib');

const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

let [N, M, R] = input.shift().split(' ').map(Number)

// 정점의 수 : N   간선의 수 : M   시작 정점 : R

console.log(N, M, R)
let visited = new Array(N + 1).fill(0);

function dfs(N){
    if(visited[R]==1) return;
    visited[R]=1;

    for(let i = 0 ; i<N ; i++){
        let next = [N][i]
        if(visited[next]==0){
            dfs(next)
        }
    }
    
}

console.log(dfs(N))


