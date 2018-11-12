class HashMap {
  
  constructor(capacity = 8){
    this.capacity = capacity;
    this.length = 0;
    this.slots = [];
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
    const hash = HashMap.hash(key);
    const start = hash % this.capacity;
    for(let i = start; i < start + this.capacity; i++){
      const index = i % this.capacity;
      const slot = this.slots[index];
      if(!slot || (!slot.deleted && slot.key === key)){
        return index;
      }
    }
  }

  resize(capacity){
    const oldSlots = this.slots;
    this.slots = [];
    this.capacity = capacity;
    this.length = 0;
    oldSlots.forEach(slot => {
      if(!slot || slot.deleted) return;
      const { key, value } = slot;
      this.put(key, value);
    });
  }

  put(key, value){
    if(((this.length + 1)/this.capacity) > HashMap.LOAD_RATIO) this.resize(this.capacity * HashMap.SIZE_RATIO);
    const index = this.findSlot(key);
    this.slots[index] = {
      key,
      value, 
      deleted: false
    };
    this.length++;
  }

  get(key){
    const index = this.findSlot(key);
    const slot = this.slots[index];
    if(!slot){
      console.log(`${key} in not a valid key`);
      return;
    }
    return slot.value;

  }
  
  remove(key){
    const index = this.findSlot(key);
    const slot = this.slots[index];
    if(!slot || slot.deleted){
      console.log(`\n${key} in not a valid key`);
      return;
    }
    slot.deleted = true;
    this.length--;
  }

  print(){
    this.slots.forEach(slot => {
      if(!slot || slot.deleted) return;
      const { key, value } = slot;
      console.log(`${key}: ${value}`);
    });
  }
}

HashMap.LOAD_RATIO = .90;
HashMap.SIZE_RATIO = 3;

if(require.main === module){
  const lor = new HashMap();
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
  ['Ent', 'Hobbit', 'Wizard', 'Human', 'Fish'].forEach(key => lor.remove(key));
  console.log('\nAfter deletions:');
  lor.print();
}