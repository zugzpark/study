const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');



let point = 0;

for(let i =1 ; i<=input[0] ; i++){
    let oLength = []    
    
    input[i].split('X').toString().trim().split(',').filter(x => oLength.push(x.length))
    
    oLength.filter(x => x!=0).forEach(x => {
        let cnt = 0;
        
        for(let j=1; j<=x ; j++){
            cnt+=j;
        }
        point+=cnt;
        
        
    })
    console.log(point)
    point=0;
}

//더 줄여보기