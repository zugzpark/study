const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');
input.shift()
//console.log(input[0])

let cnt = 0;
let word = "";
let empty = "";
let answer = [];

for(let i = 0 ; i<input.length ; i++){
    cnt = input[i].split(' ')[0]
    word = input[i].split(' ')[1]
    //console.log(cnt + " " + word);
    for(let j = 0 ; j<word.length ; j++){
        let wcnt = 0;
        while(cnt!=wcnt){
            empty+= word.split('')[j]
            wcnt++;
        }
       
    }
    answer.push(empty)
    empty=""
    
}

console.log(answer.join('\n'))