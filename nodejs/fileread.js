const fs = require('fs');
fs.readFile('sample.txt','utf8',(err, data)=>{
    //readFile함수는 비동기적으로 읽는다. 첫째 인수는 파일 경로다. 둘째 인수는 인코딩 형식. 현 인코딩 형식에 맞춰 입력해야 문제 없이 출력된다
    if (err) throw err; //콜백 함수에는 두 매개변수가 존재하는데, data는 파일을 전달 받는다
    console.log(data); 
})
