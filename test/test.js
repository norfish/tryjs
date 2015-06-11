function fn(a, b){
  var sum;
  sum = a + b - 2;
  return sum;
}

var fn2 = function(msg) {
  alert('message' + msg);
};

var fn3 = function(j, k, m){
  if(!j){
    return;
  }
  if(k == 3){
    fn(k, m);
  }
}

try{
  var b = 'name';
}catch(e){
  var line = node.line;
  var col = node.col;
  var name = node.name;
  console.log('e', e);
}