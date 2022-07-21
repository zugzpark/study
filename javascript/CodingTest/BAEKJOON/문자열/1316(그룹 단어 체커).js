const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

let word = input.map(x => x.replace('\r',''));
let cnt = word[0]
//console.log(word)

for(let i=1 ; i<word.length ; i++){
    
    let eachWord = word[i].split('');
    //console.log(word[i])
    while(eachWord.length!=0){

        let firstWord = eachWord.shift()
        //console.log(firstWord + " >> " +eachWord)
        //console.log(eachWord.indexOf(firstWord))
        if(eachWord.indexOf(firstWord)>0){
            cnt--;
            break;
        }
        

    }
}

console.log(cnt)// 연속된것이 있고 -> 그 뒤에 같은문자가 나오면 false
