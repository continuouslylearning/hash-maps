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

}