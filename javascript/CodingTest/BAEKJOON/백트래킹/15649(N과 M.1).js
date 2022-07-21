const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ').map(Number);


//console.log(input)

let n = input[0]
let m = input[1]

let answer ="";
let out = [];

let visited = new Array(n)


function num(cnt){
    
    if(cnt === m){
        //넘겨받은 인자가 m과 같으면 출력
        answer += `${out.join(' ')}\n`
        
        return;
    }   


    for(let i=0 ; i<n ; i++){
        
        if(visited[i]==true) {
        
            continue;
        }
        //visited[0]==있으면 밑에것 실행 X
        visited[i] = true;
        //vistied[0] = true 로 치환
        out.push(i+1)
        
        //out 에 0+1 = 1 입력  out = [1]
        num(cnt+1)
        //num 에 입력받은 cnt -> 여기선 0 입력 cnt+1 = 1입력
        //num 호출 cnt와 m 비교  ==>>> 재귀
        out.pop();
        visited[i]=false;
        
    }
}


num(0)
console.log(answer)