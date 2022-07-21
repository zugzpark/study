const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.pop();



for(let i=0 ; i<input.length ; i++){
    let [a,b] = input[i].split(' ').map(Number)
    //console.log(`a = ${a} b = ${b}`)

    console.log(b%a==0?"factor":a%b==0?"multiple":"neither")
}

