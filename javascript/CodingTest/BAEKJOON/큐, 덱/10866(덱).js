const input = require('fs').readFileSync('예제.txt').toString().trim().split('\n')

input.shift();


class Node {
  constructor(val){
    this.val = val
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor(){
    this.head = null;
    this.tail = tail;
    this._size = 0;

  }

  pushFront(val){
    const newNode = new Node(val);
    if(this.getSize() === 0){
      this.head = newNode;
      this.tail = newNode;

    } else {
      newNode.next = this.head
      this.head.next = newNode;
      this.head = newNode
    }
    this._size++

  }

  
}
