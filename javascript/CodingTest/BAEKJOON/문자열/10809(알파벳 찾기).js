const input = require('fs').readFileSync('./예제.txt').toString().trim().split('');

let answer = []
let outPut = "";
//let st = 'z'
//console.log(st.charCodeAt(st))

input.forEach(x => answer.push(x.charCodeAt(x)))

for(let i = 97 ; i<=122 ; i++){
    outPut +=answer.findIndex(x =>x==i)+" "
    
}

console.log(outPut)



//.join(' ')