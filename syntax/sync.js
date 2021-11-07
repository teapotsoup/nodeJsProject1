var fs = require('fs');

//readFileSync

console.log('A');
let result = fs.readFileSync('syntax/sample.txt','utf8');
console.log(result);
console.log('C');
//순차적으로 실행된다

//readFile
console.log('A');
fs.readFile('syntax/sample.txt','utf8', (err,result)=>{
    console.log(result);
}); //리드 파일 함수는 함수를 세번째 인자로 준다
//현재 코드 작업이 끝난후 실행시킨다
//파일을 읽은후 호출

console.log('C');
//ACB로 실행된다