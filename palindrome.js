function checkPalindrome(word){

  const map = new Map();
  
  for(let c of word){
    if(!map.has(c)){
      map.set(c, 1);
    } else {
      map.set(c, map.get(c) + 1);
    }
  }

  let oddCount = 0;
  map.forEach((value, key) => {
    if(value % 2 !== 0){
      oddCount++;
    }
  });

  return oddCount <= 1;
}

if(require.main === module){
  console.log(checkPalindrome('acecarr'));
  console.log(checkPalindrome('north'));
}