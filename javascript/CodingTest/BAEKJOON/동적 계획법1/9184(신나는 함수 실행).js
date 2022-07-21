const [...array] = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');




function w(a,b,c){
 
    if(a<=0 || b<=0 || c<=0)return 1
    if(a>20 || b>20 > c>20) return w(20,20,20)
    if(a<b && b<c) return w(a,b,c-1) + w(a,b-1,c-1) - w(a,b-1,c)

    return w(a-1,b,c) + w(a-1,b-1,c) + w(a-1,b,c-1) - w(a-1, b-1 , c-1)
}


console.log(w(50,50,50))