const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');


//console.log(input)
input.pop();
for(let i=0; i<input.length ; i++){
 //console.log(input[i].replace(/[A-Za-z]/gi,'').replace(/ /gi,''))
 input[i] = input[i].replace(/[A-Za-z]/gi,'').replace(/ /gi,"").replace("\r","")
 
 while(input[i].includes('()') || input[i].includes('[]') || input[i].includes('.')){

   input[i] = input[i].replace("()",'')
   input[i] = input[i].replace("[]",'')
   input[i] = input[i].replace(".","")
   
 }
 console.log(input[i].length==0?"yes":"no")
}