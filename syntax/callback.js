/*
function a(){
  console.log('A');
}
*/

//익명함수
//변수에 함수가 저장이된다 -> 함수=값
var a = function(){
  console.log('A');
}


function slowfunc(callback){
  callback();
}

slowfunc(a);
