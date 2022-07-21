const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n')

input.shift()

let num = input[0].split(' ').map(Number)




let answer = []
num.sort((a,b) => a-b)

console.log(num)

for(let start = 0 ; start<num.length-2 ; start++){
    
    let mid = start+1;
    let end = num.length-1
    //console.log("==========>"+num[start])
    while(mid<end){
        
        sum = num[start]+num[mid]+num[end]
        console.log(` start = ${num[start]} mid = ${num[mid]} end = ${num[end]} sum = ${sum}`)
        if(sum==0){
            answer.push([num[start],num[mid],num[end]])
            mid++
        } else if(sum>0){
            end--
        } else{
            mid++
        }
        
    }
}
console.log(answer)
console.log(answer.length)

