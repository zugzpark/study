const input = require('fs').readFileSync('./예제.txt').toString().trim().split(' ');


let [A,B,V] = input.map(Number);

//높이 = V  ,   낮에 A 올라가고 밤에 B만큼 내려옴.  정상에 올라가면 미끄러지지 않음.
// 며칠이 걸리는지?

console.log(A + "  " + B  + "  " + V)
console.log(A-B==1?V-B:V%(A-B))
