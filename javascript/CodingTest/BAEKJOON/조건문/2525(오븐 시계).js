const input= require('fs').readFileSync('예제.txt').toString().trim().split('\n');


let [time , b] = input

let B = Number(b)

let [h,m] = time.split(' ').map(Number)



if(B+m>=60){
    h=h+Math.floor((B+m)/60)
    m = (B+m)%60
    if(h>23){
        h=h%24
    }
} else {
    m+=B
}

console.log(`${h} ${m}`)