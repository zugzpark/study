const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n');


input.shift()

let answer = []
let massage = [];
for(let i = 0 ; i<input.length ; i++){
    let word = input[i].replace(/\r/g,'')
    let order = word.split(' ')[0]
    let num = word.split(' ')[1]
    
    switch(order){
        case 'push' : answer.push(num)
        break;

        case 'pop' : massage.push(answer==""?-1:answer.pop())
        break;

        case 'size' : massage.push(answer.length)
        break;

        case 'empty' : massage.push(answer==""?1:0)
        break;

        case 'top' : massage.push(answer[answer.length-1]==null?-1:answer[answer.length-1])
        break;
    }


}

console.log(massage.join('\n'))

/*const array = require('fs').readFileSync('/dev/stdin').toString().split('\n');
array.shift();

const stack = [];

const fun = {
  pop: () => stack.pop() || -1,
  size: () => stack.length,
  empty: () => stack[0] ? 0 : 1,
  top: () => stack[stack.length - 1] || -1,
  push: (item) => {
    stack.push(item.split(" ")[1]); 
    return '';
  }
}

const result = array.reduce((acc, v) => 
	acc + (fun[v] ? `${fun[v]()}\n` : fun.push(v)), '');

console.log(result);
*/