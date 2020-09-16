var v1 = 'v1';
// 10000 code가 있다 가정
v1 = 'egoing';
var v2 = 'v2';

var q = {
  v1:'v1',
  v2:'v2',
  f1:function(){
    console.log(this.v1);
  },
  f2:function(){
    console.log(this.v2);
  }
}

// 실무 협엽중에 중간에 같은 이름의 함수가 껴져서 기존의 함수가 못쓰게된 상황이 생길수있다.
function f1(){
  console.log(q.v1);
}
function f1(){

}
function f2(){
  console.log(q.v2);
}

f1();
f2();
console.log('============');
q.f1();
q.f2();
