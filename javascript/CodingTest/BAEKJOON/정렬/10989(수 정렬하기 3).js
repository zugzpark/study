const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');



input.shift()

let inArray = input.map(Number)
//console.log(inArray)

let cArray = new Array(Math.max(...inArray)+1).fill(0)
let answer = [];
//console.log(cArray)


for(let i=0 ; i<inArray.length ; i++){
    //console.log(inArray[i])
    cArray[inArray[i]]++
}
//console.log(cArray)
cArray.reduce((acc,val,i)=> {
    acc+=val
    return cArray[i]=acc;
},0)
//console.log(cArray)
for(let i=0; i<inArray.length; i++){
    cArray[inArray[i]]--
    answer[cArray[inArray[i]]]=inArray[i]
    
}

console.log(answer.join('\n'))