function groupAnagrams(words){
  const map = new Map();

  words.forEach(word => {
    const sorted = word.split('').sort().join();
    if(!map.has(sorted)){
      map.set(sorted, [ word ]);
    } else {
      map.get(sorted).push(word);
    }
  });

  return map.values();
}

if(require.main === module){
  const input = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
  console.log(groupAnagrams(input));
}
