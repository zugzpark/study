const input = require('fs').readFileSync('./예제.txt').toString()


let cnt = 1;
let map = new Map();

while(cnt-1!=input.length){
    
    
    for(let i=0; i<input.length ; i++){
        //console.log(input.substring(i,i+cnt))
        //console.log(` i = ${i}  i+cnt = ${i+cnt} `)
        map.set(input.substring(i,i+cnt));
    }
    cnt++
}

// 1,2   2,3    3,4


console.log(map.size)