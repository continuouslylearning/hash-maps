const Node = require('./node');

class List {
  constructor(){
    this.first = null;
  }

  put(key, value){
    let temp = this.first;
    while(temp){
      if(temp.key === key){
        temp.value = value;
        return;
      }
      temp = temp.next; 
    }
    this.first = new Node(key, value, this.first);
  }

  get(key){
    let temp = this.first;
    while(temp){
      if(temp.key === key){
        return temp.value;
      }
      temp = temp.next;
    }
    console.log(`${key} is not in the table`);
    return null;
  }

  remove(key){
    this.first = this.removeHelper(key, this.first);
  }

  removeHelper(key, node){
    if(!node){
      return null;
    } 

    if(node.key === key){
      return node.next;
    } else {
      node.next = this.removeHelper(key, node.next);
      return node;
    }
  }

  print(){
    let temp = this.first;
    while(temp){
      const { key, value } = temp;
      console.log(`${key}: ${value}`);
      temp = temp.next;
    }
  }
}

module.exports = List;