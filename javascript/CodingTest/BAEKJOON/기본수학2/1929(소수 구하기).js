const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ').map(Number);


let arr = [];

for(let i=input[0] ; i<=input[1] ; i++){
    if(i!=0 && i!=1)arr[i] =i;

}


for(let j=2; j<=input[1]; j++){
    if(arr[j]==0) continue;

    for(let k=2*j ; k<=input[1]; k+=j){
        arr[k]=0;
    }
}

console.log(arr.filter(x => x!=0).toString().replace(/,/gi,'\n'))