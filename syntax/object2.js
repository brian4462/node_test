var f = function(){
  console.log(1+1);
  console.log(1+2);
}
console.log(f);
f();
//var i = if(true){console.log(1)}
//var w = while(true){console.log(1)};

//배열의 원소로서 함수는 존재할수있다
 var a = [f]; //함수를 a라는 배열에 저장한다
 a[0]();

//객체로서도 함수는 정의가 가능하다
var o = {
  func:f
}
o.func();
