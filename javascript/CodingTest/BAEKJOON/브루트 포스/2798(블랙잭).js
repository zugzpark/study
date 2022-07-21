const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');


let m = input[0].split(' ')[1];
let card = input[1].split(' ').map(Number);
let sum = 0;
let answer = [];



for(let i=0 ; i<card.length-2 ; i++){
     for(let j=i+1 ; j<card.length-1 ; j++){
         for(let k=j+1 ; k<card.length ; k++){          
            //console.log(`card[i] = ${card[i]}   card[j] = ${card[j]}   card[k] = ${card[k]}`)
            sum = card[i]+card[j]+card[k]
            //console.log(sum + " <> " + m)

            if(m>=sum && sum>answer){
              answer = sum
              console.log(`sum = ${sum}  answer = ${answer} m = ${m}`)
            }

            
            
            
        }
    }
}
console.log(answer)