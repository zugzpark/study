const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')



input.shift()

let set = new Set(input);

let answer = [...set]



answer.sort((a,b) => {
    if(a.length==b.length){
        
        for(let i=0 ; i<a.length ; i++){
            //console.log(" ?? >>> " + a.split('')[0]+"  <>   " +b.split('')[0])
            if(a.split('')[i]!=b.split('')[i]){
                return a.split('')[i].charCodeAt(a.split('')[i])-b.split('')[i].charCodeAt(b.split('')[i])
            }
        }
        
    } else {
        return a.length-b.length
    } 
})

console.log(answer.join('\n'))