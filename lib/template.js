
  module.exports={
    html:  function (title, list, body, control) {
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
    },
    list:function (filelist) {
      var list = "<ul>"; //list 변수에 html 태그인 <ul>을 할당한다.
      for (let i = 0; i < filelist.length; ++i) {
        //filelist의 요소 갯수만큼
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      }
      list = list + "</ul>"; //배열 내 요소 갯수만큼 li태그 삽입하고 반복문 종료후 ul로 닫음
    
      return list;
    }
  }
