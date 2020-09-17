var sanitizeHtml = require('sanitize-html');

module.exports = {
  html:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      <style>
        body{
          margin:0;
        }
        a {
          color:black;
          text-decoration: none;
        }
        h1 {
          font-size:45px;
          text-align: center;
          border-bottom:1px solid gray;
          margin:0;
          padding:20px;
        }
        ol{
          border-right:1px solid gray;
          width:100px;
          margin:0;
          padding:20px;
        }
        table{
          margin-top: 10px;
          border-collapse: collapse;
        }
        td{
          border:1px solid black;
        }
        #grid{
          display: grid;
          grid-template-columns: 150px 1fr;
        }
        #grid ol{
          padding-left:33px;
        }
        #grid #article{
          padding-left:25px;
        }
        @media(max-width:500px){
          #grid{
            display: block;
          }
          ol{
            border-right:none;
          }
          h1{
            border-bottom:none;
          }
        }
      </style>
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <div id="grid">
      ${list}
      ${control}
        <div id="article">
          ${body}
        </div>
      </div>
    </body>
    </html>
    `;
  },
  list:function(topics){
    var list = '<ol>';
    var i = 0;
    list += `<a href="/author">author</a>`;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${sanitizeHtml(topics[i].title)}</a></li>`;
      i = i + 1;
    }
    return list;
  },
  authorSelect:function(authors,author_id){
    var tag = '';
    var i = 0;
    while(i < authors.length){
      var selected = '';
      if(authors[i].id === author_id){
        selected = ' selected';
      }
      tag += `<option value="${authors[i].id}"${selected}>${sanitizeHtml(authors[i].name)}</option>`;
      i++;
    }
    return `
      <select name="author">
        ${tag}
      </select>
    `
  },
  authorTable:function(authors){
    var tag ='<table>';
    var i = 0;
    while (i < authors.length) {
      tag += `
          <tr>
            <td>${sanitizeHtml(authors[i].name)}</td>
            <td>${sanitizeHtml(authors[i].profile)}</td>
            <td><a href="/author/update?id=${authors[i].id}">update</a></td>
            <td>
              <form action="/author/delete_process" method="post">
                <input type="hidden" name="id" value="${authors[i].id}">
                <input type="submit" value="delete">
              </form>
            </td>
          </tr>
      `;
      i++;
    }
    tag += '</table>';
    return tag;
  }
}
