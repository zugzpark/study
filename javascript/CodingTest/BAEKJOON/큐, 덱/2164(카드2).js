const input = require('fs').readFileSync('예제.txt').toString()

let n = Number(input)

class Node {
  constructor(val){
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LinkdList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  add(val){
    const newNode = new Node(val);

    if(!this.head){

      this.head = newNode;

    } else {

      this.tail.next = newNode;
      newNode.prev = this.tail;

    }

    this.tail = newNode;
    this._size++;

    return newNode;
  }

  getHead = () => this.head.val

  removeHead = () => {
    this.head = this.head.next;
    this.head.prev = null;
    this._size--;
  }

  getSize = () => this._size;
  

}

const card = new LinkdList();

 for(let i = 1 ; i<=n; i++){
   card.add(i)
   
 } 
 
 while(card.getSize()!==1){
   card.removeHead();
   card.add(card.getHead());
   card.removeHead();
 }




console.log(card.getHead())