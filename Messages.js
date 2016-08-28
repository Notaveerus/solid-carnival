
var alphabet = 'abcdefghijklmnopqrstuvxyz'.split('');
var encode = function(str){
  var letters = str.split('');
  var encodedLetters = [];
  for(var i=0;i<letters.length;i++){
    var array = [];
    for(var j=0;j<3;j++){
      var char = alphabet[Crafty.math.randomInt(0,alphabet.length-1)]
      if(char == letters[i])
        j--;
      else{
        array.push(char);
      }
    }
    array.push(letters[i]);
    array = shuffle(array);
    encodedLetters.push(array);
  }

  return(encodedLetters)
}

var shuffle = function(a){
  var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

var messagesE = {
  len: function(){
    var len = 0;
    for(var obj in this){
      len++;
    }
    return len;
  },
  1:{
    msg: 'Bomb'
  }, 2:{
    msg: 'Target'
  }, 3:{
    msg: 'Destroy'
  }
}

var messagesF = {
  len: function(){
    var len = 0;
    for(var obj in this){
      len++;
    }
    return len;
  },
  1:{
    msg: 'Reports'
  }, 2:{
    msg: 'Supplies'
  }, 3:{
    msg: 'Traitor'
  }
}
