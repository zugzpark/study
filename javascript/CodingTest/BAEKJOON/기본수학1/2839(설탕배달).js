const input = require('fs').readFileSync('./예제.txt').toString()



//3킬로 봉지와 5킬로봉지
// 최소봉지 
let cntA = -1;
let cntB = -1;
let cnt=-1;
for(let i=1 ; i<=Math.floor(input/5); i++){

    if((input-5*i)%3==0){
        cntA = i;
        cntA+=(input-5*i)/3
    }
}

for(let j=1 ; j<=Math.floor(input/3); j++){

    if((input-3*j)%5==0){
        cntB = j;
        cntB+=(input-3*j)/5
    }
}

if(cntA!=-1 && cntB!=-1){
    cntA<cntB?cnt=cntA:cnt=cntB
} else if(cntA==-1 || cntB==-1){
    cntA==-1?cnt=cntB:cnt=cntA;
}

console.log(cnt)
//console.log((input%5)%3==0?(console.log(232)):-1)

