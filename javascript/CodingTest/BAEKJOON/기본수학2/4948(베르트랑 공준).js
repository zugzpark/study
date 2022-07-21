const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n').map(Number);


//console.log(input)

input.forEach(x => {
    let arr = [];
    //console.log(x)

    
    for(let i=x+1 ; i<=2*x ; i++){
        arr.push(i)
        if(i==2)continue;
        
        //console.log(" >>> " + i)
        
        for(let j=2 ; j<=Math.ceil(Math.sqrt(i)) ; j++){
            //console.log(j + " <> " + i)
            if(i%j==0){
                arr.pop()
                break;
            }
        
        }
        
    }

    arr.length>0?console.log(arr.length):""


})