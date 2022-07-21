const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.shift();


let r = input[0].split(' ')



let bigCercle = r[0]
for(let i=1 ; i<r.length ; i++){
    
    if(r[0]%r[i]==0){
        
        console.log(r[0]/r[i]+"/"+r[i]/r[i])
    } else {
        
        let GCD = (a,b) => (b>0?GCD(b,a%b):a);
        let LCM = (a,b) => (a*b) / GCD(a,b)
        console.log(LCM(bigCercle,r[i])/r[i] +"/"+LCM(bigCercle,r[i])/r[0])
    }
    
    
}