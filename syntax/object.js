//객체 값 반복문으로 가져오기
var role ={
    "name":"sjw",
    "age":23,
    "job":"fe developer"
}

for(var key in role){
    console.log("key:",key,"value:",role[key]); //객체이름[키]
}

//함수를 배열또는 객체에 넣고 불러오는 방법
var f =()=>{
    console.log(1+1);
    console.log(1+2);
}
var c = [f]

c[0]();

var o ={
    func:f
}

o.func();
//반복문이나 조건문과 달리, 자바스크립트의 함수는 값이기에 배열이나 객체에 담을수 있다