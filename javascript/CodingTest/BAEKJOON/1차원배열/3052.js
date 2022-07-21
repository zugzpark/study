const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

//const count = new Set(input.map(x => x % 42)).size;

let [...number] = input.map(Number);

let arr = new Array();

for(let x of number){

    arr.push(x%42)
}

const set = new Set(arr)

console.log(set.size)