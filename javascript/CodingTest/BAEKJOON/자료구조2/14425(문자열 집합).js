const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');


let [N,M] = input.shift().split(' ');
let S = {
    
}
let cnt = 0;
//console.log(`N = ${N} M = ${M}`)

for(let i = 0 ; i< N ; i++){
    S[(input[i].replace('\r',''))] = true;
}

//console.log(S)

for(let i=N ; i<input.length ; i++){
    S[input[i].replace('\r','')]?cnt++:cnt
}



console.log(cnt)