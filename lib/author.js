var db = require('./db');
var template = require('./template.js');
var qs = require('querystring');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

exports.home = function(request,response){
  db.query(`SELECT * FROM topic`, function(error,topics){
    db.query(`SELECT * FROM author`, function(error2,authors){
      var title = 'author';
      var list = template.list(topics);
      var html = template.html(title, list,
          `${template.authorTable(authors)}
          <form action="/author/create_process" method="post">
            <p>
              <input type="text" name="name" placeholder="name">
            </p>
            <p>
              <textarea name="profile" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<div id="btnArea"><a href="/create">create</a></div></ol>`
      );
      response.send(html);
    });
  });
}

exports.create_process = function(request, response){
  var post = request.body;
  db.query(`
    INSERT INTO author(name,profile) VALUES(?,?)`,
  [post.name, post.profile],
  function(error, result){
    if(error){
      throw error;
    }
    response.redirect(`/author`);
  });
}

exports.update = function(request,response){
  var _url = request.url;
  db.query(`SELECT * FROM topic`, function(error,topics){
    if(error){throw error;}
    db.query(`SELECT * FROM author`, function(error2,authors){
      if(error2){throw error2;}
      db.query(`SELECT * FROM author WHERE id=?`,[request.params.authorId], function(error3,author){
        if(error3){throw error3;}
        var title = 'author';
        var list = template.list(topics);
        var html = template.html(title, list,
            `${template.authorTable(authors)}
            <form action="/author/update_process" method="post">
              <input type="hidden" name="id" value="${request.params.authorId}">
              <p>
                <input type="text" name="name" placeholder="name" value="${sanitizeHtml(author[0].name)}">
              </p>
              <p>
                <textarea name="profile" placeholder="description">${sanitizeHtml(author[0].profile)}</textarea>
              </p>
              <p>
                <input type="submit" value="update">
              </p>
            </form>
            `,
            `<div id="btnArea"><a href="/create">create</a></div></ol>`
        );
        response.send(html);
      });
    });
  });
}

exports.update_process = function(request, response){
  var post = request.body;
  db.query(
    `UPDATE author SET name=?, profile=? WHERE id=?`,
    [post.name, post.profile, post.id],
    function(error, result){
      if(error){throw error;}
    response.redirect(`/author`);
    }
  );
}

exports.delete_process = function(request, response){
  var post = request.body;
  db.query('DELETE FROM topic WHERE author_id = ?', [post.id], function(error, result){
    if(error){throw error;}
    db.query('DELETE FROM author WHERE id = ?', [post.id], function(error2, result){
      if(error2){throw error2;}
      response.redirect(`/author`);
    });
  });
}
