class Node {
  constructor(key, value, next = null){
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

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
      console.log(node.key);
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

class HashMapSC {
  constructor(capacity = 8){
    this.length = 0;
    this.capacity = capacity;
    this.slots = [];
    for(let i = 0; i < this.capacity; i++){
      this.slots.push(new List());
    }
  }

  static hash(key){
    let hash = 5381;
    for(let i = 0; i < key.length; i++){
      hash = (hash << 5) + hash + key.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  findSlot(key){
    const hash = HashMapSC.hash(key);
    return hash % this.capacity;
  }

  put(key, value){
    const index = this.findSlot(key);
    this.slots[index].put(key, value);
  }

  get(key){
    const index = this.findSlot(key);
    return this.slots[index].get(key);
  }

  remove(key){
    const index = this.findSlot(key);
    this.slots[index].remove(key);
  }

  print(){
    this.slots.forEach(slot => slot.print());
  }
}

if(require.main === module){
  const lor = new HashMapSC();
  const lorChars = [
    {Hobbit:"Bilbo"}, {Hobbit:"Frodo"}, {Wizard:"Gandolf"}, 
    {Human:"Aragon"}, {Elf: "Legolas"}, {Maiar:"The Necromancer"}, {Maiar: "Sauron"}, 
    {RingBearer: "Gollum"}, {LadyOfLight: "Galadriel"}, {HalfElven: "Arwen"}, {Ent: "Treebeard"}
  ];

  lorChars.forEach(char => {
    Object.keys(char).forEach(key => lor.put(key, char[key]));
  })
  
  lor.print();
  console.log(`Value of key Maiar is`, lor.get('Maiar'));
  console.log();
  ['Ent', 'Hobbit', 'Wizard', 'Human', 'Fish'].forEach(key => lor.remove(key));
  console.log('\nAfter deletions:');
  lor.print();
}