const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');

input.shift();






let arr = input[0].split(' ').map(Number)
arr.sort((a,b) => a-b)



console.log(arr.length==1?arr[0]*arr[0]:arr[0]*arr[arr.length-1])