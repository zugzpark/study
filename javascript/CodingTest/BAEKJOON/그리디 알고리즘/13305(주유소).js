const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.shift()

let [road,oil] = input


console.log(road.split(' ').map(Number))
console.log(oil.split(' ').map(Number))

// 총 거리 = 6
// 촏 도시 = 4
