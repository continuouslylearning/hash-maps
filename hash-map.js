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
    if((this.length + 1)/this.capacity > HashMap.LOAD_RATIO) resizeBy(this.capacity * HashMap.SIZE_RATIO);
    const index = findSlot(key);
    this.slots[index] = {
      key,
      value, 
      deleted: false
    };
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