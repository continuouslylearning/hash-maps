class Node {
  constructor(key, value, next = null){
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

module.exports = Node;