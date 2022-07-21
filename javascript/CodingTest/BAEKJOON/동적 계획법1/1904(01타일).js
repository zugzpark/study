const input = require('fs').readFileSync('./예제.txt').toString()



console.log(input)
let answer = "";
let visited = new Array(input)
let out = [];
let zeroTile = "0"
let oneTIle = "1"


function num(cnt){
    console.log(` cnt = ${cnt} input = ${input}`)
    if(cnt === input){
        //넘겨받은 인자가 m과 같으면 출력
        answer += `${out.join(' ')}\n`
        
        return;
    }   


    for(let i=0 ; i<input ; i++){
        
        if(visited[i]==true) {
            console.log(" visitied[i]==true");
            continue;
        }
        //visited[0]==있으면 밑에것 실행 X
        visited[i] = true;
        //vistied[0] = true 로 치환
        out.push(i)
        console.log(out)
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