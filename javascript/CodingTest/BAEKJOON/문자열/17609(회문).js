let input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.shift()


for(let i=0 ; i<input.length ; i++){
    let word = input[i].replace('\r','')
   console.log(word) 
    console.log(word.length)
    if((word.length)%2==0){
        console.log("짝")

    } else {
        console.log("홀")
        console.log(word[Math.floor(word.length/2)])
        console.log(word.slice(0,Math.floor(word.length/2)-1))
        console.log(word.slice(Math.floor(word.length/2)+2,word.length).split('').reverse().join(''))
    }
}






