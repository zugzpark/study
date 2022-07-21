const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');


let [h,m] = input.map(Number)



if(m-45<0){
    m+=60-45;
    h--;
    if(h<0){
        h=23
    }
} else {
    m-=45
}

console.log(`${h} ${m}`)