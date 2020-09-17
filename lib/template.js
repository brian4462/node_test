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
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    return list;
  }
}
