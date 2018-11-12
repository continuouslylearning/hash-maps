const List = require('./list');

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
  });
  
  lor.print();
  console.log(`Value of key Maiar is`, lor.get('Maiar'));
  ['Ent', 'Hobbit', 'Wizard', 'Human', 'Fish'].forEach(key => lor.remove(key));
  console.log('\nAfter deletions:');
  lor.print();
}