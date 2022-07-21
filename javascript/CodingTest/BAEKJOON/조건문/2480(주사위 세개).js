const input = require('fs').readFileSync('예제.txt').toString().trim().split(' ').map(Number);


let [a,b,c] = input


let answer = 0;

if(a==b && a==c){
    
    answer = 10000+(a*1000)
} else if(a==b || a==c ||b==c){
        
    if(b==c){
        answer = 1000+(b*100)
    } else {
        answer = 1000+(a*100)
    }
    

} else {
    console.log('test')
    answer = input.sort((a,b) => b-a)[0]*100
}

console.log(answer)