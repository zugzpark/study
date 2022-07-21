const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');


let n = []
let m = []
let answer = []
input.shift()
for(let i=0 ; i<input.length ; i++){
    if(i==0){
        n = input[i].split(' ').map(Number)
    } else if(i==2){
        m = input[i].split(' ').map(Number)
    }
}

n.sort((a,b) => a-b)




m.forEach(x => {
    let start = 0
    let end = n.length-1
    let mid = Math.floor((end+start)/2)
    while(end-start>=0){
        
        if(n[mid]==x){
            
            return answer.push(1)
        } else if(n[mid]>x){
            end = mid-1
        } else {
            start = mid+1
        }

        mid = Math.round((end+start)/2)
       
    }
    
    return answer.push(0)
    
})

console.log(answer.join('\n'))