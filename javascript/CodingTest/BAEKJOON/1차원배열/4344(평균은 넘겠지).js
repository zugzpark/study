const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');



for(let i=1 ; i<input.length ; i++){
    //console.log(` i = ${i}   ` + input[i])
    
    let n = input[i].split(' ')[0]
    let num = input[i].split(' ').map(Number);
    let sum = 0;
    console.log(`n = ${n}  num = ${num} `)
    num.forEach((x,i) => {
        if(i!=0)sum+=x
    });

    let avg = sum/n;
    console.log(` avg = ${avg} sum = ${sum}`)

    let cnt = 0;
    num.forEach((v,i) => {
        if(i!=0)v>avg?cnt++:cnt
    })
    //console.log(`avg = `+ avg)
    //console.log(`num = `+ num )
    //console.log(`cnt = `+ cnt + `  n = ` + n  + `   cnt/n = ` + (cnt/n)*100)
    console.log((cnt/n*100).toFixed(3)+"%")
    
}