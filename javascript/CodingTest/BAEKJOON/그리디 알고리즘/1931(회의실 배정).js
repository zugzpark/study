const input = require('fs').readFileSync('./예제.txt').toString().trim().split('\n');

input.shift()


console.log(input.sort((a,b) => a-b))



/*

1 2 3 4 -----
3 4 5 
0 1 2 3 4 5 6 
5 6 7 ---------
3 4 5 6 7 8
5 6 7 8 9 
6 7 8 9 10
8 9 10 11 ------
8 9 10 11 12 
2 3 4 5 6 7 8 9 10 11 12 13
12 13 14 -----

*/