var http = require("http");
var fs = require("fs");
var url = require("url");
const querystring = require("querystring");

//모듈들

function templateHTML(title, list, body, control) {
  return `
        <!doctype html>
        <html>
        <head>
          <title>WEB - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          ${control}
          ${body}
        </body>
        </html>
        `;
}

function templateList(filelist) {
  var list = "<ul>"; //list 변수에 html 태그인 <ul>을 할당한다.
  for (let i = 0; i < filelist.length; ++i) {
    //filelist의 요소 갯수만큼
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list = list + "</ul>"; //배열 내 요소 갯수만큼 li태그 삽입하고 반복문 종료후 ul로 닫음

  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url; //request.url - 사용자가 선택한 주소 전체
  var queryData = url.parse(_url, true).query; //parse: 분석하다
  //url.parse(_url, true) : URL 문자열을 입력하면 URL 객체를 만든다. 요소를 확인해서 기능 만들기 좋다.
  var pathname = url.parse(_url, true).pathname; // /표기
  let title = queryData.id; //사용자가 선택한 URL 객체의 ID값을 가져온다. HTML, CSS, JavaScript등..
  if (pathname === "/") {
    //메인 홈페이지에서는 queryData.id가 undefined
    if (title === undefined) {
      fs.readdir("./data", (error, filelist) => {
        // filelist는 data 파일 내 파일들 제목 배열이다. EX) [ 'CSS', 'HTML', 'JavaScript', 'nodejs' ]
        var title = "Welcome";
        var desc = "Hello, Node.js";
        let list = templateList(filelist);
        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>${desc}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data",  (error, filelist)=>{
        fs.readFile(`data/${title}`, "utf8",  (err, desc)=> {
          let list = templateList(filelist);
          var template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>${desc}`,
            `<a href="/create">create</a>
            <a href="/update?id=${title}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
            </form>`
          );//쿼리 스트링이 있으면 get방식
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    //<a href="/create">create</a> 컴포넌트를 클릭했을때
    fs.readdir("./data", (error, filelist) => {
      // filelist는 data 파일 내 파일들 제목 배열이다. EX) [ 'CSS', 'HTML', 'JavaScript', 'nodejs' ]
      var title = "WEB - create";
      let list = templateList(filelist);
      var template = templateHTML(
        title,
        list,
        `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="desc" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
        ""
      ); //사용자가 post방식으로 정보를 전달했을때 포스트방식으로 전달된 데이터를 노드 js는 어떻게 가져오는가
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    let body = "";
    request.on("data", (data) => {
      //request에 데이터가 있을때 처리하는 함수
      body = body + data;
    }); //post방식으로 전달되는 데이터가 많을 것을 대비함
    //데이터를 수신할때마다 콜백함수를 실행한다. 그리고 데이터를 매개변수로 받아 전달한다
    request.on("end", () => {
      // data 처리가 끝났음을 알리는 함수
      console.log(body);
      let post = querystring.parse(body);
      console.log(post);
      var title = post.title;
      var desc = post.desc;
      fs.writeFile(`data/${title}`, desc, "utf8", (err) => {
        response.writeHead(302, { Location: `/?id=${encodeURI(title)}` });
        response.end();
      });
    });
    //이벤트 리스너는 쉽게 말해 어떠한 이벤트에 대해
    //대기중인 상태를 말합니다.
  } else if (pathname === "/update") {
    fs.readdir("./data",  (error, filelist)=> {
      fs.readFile(`data/${title}`, "utf8",  (err, desc) =>{
        let list = templateList(filelist);
        var template = templateHTML(
          title,
          list,
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="desc" placeholder="description">${desc}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
  } 
  else if (pathname === "/update_process") {
    let body = "";
    request.on("data", (data) => {
      //request에 데이터가 있을때 처리하는 함수
      body = body + data;
    }); //post방식으로 전달되는 데이터가 많을 것을 대비함
    //데이터를 수신할때마다 콜백함수를 실행한다. 그리고 데이터를 매개변수로 받아 전달한다
    request.on("end", () => {
      // data 처리가 끝났음을 알리는 함수
      console.log(body);
      let post = querystring.parse(body);
      console.log(post);
      var id = post.id;
      var title = post.title;
      var desc = post.desc;
      fs.rename(`data/${id}`, `data/${title}`, (err) => {
        fs.writeFile(`data/${title}`, desc, "utf8", (err) => {
          response.writeHead(302, { Location: `/?id=${encodeURI(title)}` });
          response.end();
        });
      });

    });
  }
  else if (pathname === "/delete_process") {
    let body = "";
    request.on("data", (data) => {
      //request에 데이터가 있을때 처리하는 함수
      body = body + data;
    }); //post방식으로 전달되는 데이터가 많을 것을 대비함
    //데이터를 수신할때마다 콜백함수를 실행한다. 그리고 데이터를 매개변수로 받아 전달한다
    request.on("end", () => {
      // data 처리가 끝났음을 알리는 함수
      console.log(body);
      let post = querystring.parse(body);
      console.log(post);
      var id = post.id;
      fs.unlink(`data/${id}`, ()=>{
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  }
  else {
    response.writeHead(404);
    //404란 숫자를 서버가 브라우저에게 주면 실패의미
    response.end("Not found");
  }
});
app.listen(3000);
