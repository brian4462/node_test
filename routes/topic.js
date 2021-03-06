var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
var template = require('../lib/template.js');
var url = require('url');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');

router.get('/create', function(request, response){
  db.query(`SELECT * FROM topic`, function(error,topics){
    if(error){
      throw error;
    }
    db.query(
      `SELECT * FROM author`,
      function(error2,authors){
        if(error2){
          throw error2;
        }

        var title = 'WEB - create';
        var list = template.list(topics);
        var html = template.html(sanitizeHtml(title), list,
          `
          <form action="/topic/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              ${template.authorSelect(authors)}
            </p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,'</ol>');
        response.send(html);
      }
    );
  });
});
router.post('/create_process', function(request, response){
  var post = request.body;
  db.query(`
    INSERT INTO topic(title,description,created,author_id) VALUES(?,?,NOW(),?)`,
  [post.title, post.description, post.author],
  function(error, result){
    if(error) throw error;
    response.redirect(`/topic/${result.insertId}`);
  });
});
router.get('/update/:pageId', function(request, response){
  db.query(`SELECT * FROM topic`, function(error,topics){
    if(error){
      throw error;
    }
    db.query(`SELECT * FROM topic WHERE id=?`,[request.params.pageId], function(error2,topic){
      if(error2){
        throw error2;
      }
      db.query(
        `SELECT * FROM author`,
        function(error2,authors){
          if(error2){
            throw error2;
          }
          var title = topic[0].title;
          var description = topic[0].description;
          var list = template.list(topics);
          var html = template.html(sanitizeHtml(title), list,
            `
            <form action="/topic/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(topic[0].title)}"></p>
              <p>
                ${template.authorSelect(authors, topic[0].author_id)}
              </p>
              <p>
                <textarea name="description" placeholder="description">${sanitizeHtml(topic[0].description)}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `
            ,'</ol>'
          );
          response.send(html);
        }
      );
    });
  });
});
router.post('/update_process', function(request, response){
  var post = request.body;
  db.query(
    `UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
    [post.title, post.description, post.author, post.id],
    function(error, result){
      if(error){
        throw error;
      }
    response.redirect(`/topic/${post.id}`);
    }
  );
});
router.post('/delete_process', function(request, response){
  var post = request.body;
  var id = post.id;
  db.query('DELETE FROM topic WHERE id = ?', [post.id], function(error, result){
    if(error){
      throw error;
    }
    response.redirect(`/`);
  });
});
router.get('/:pageId', function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function(error,topics){
    if(error){
      throw error;
    }
    db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[request.params.pageId], function(error2,topic){
      if(error2){
        throw error2;
      }
      var title = topic[0].title;
      var description = topic[0].description;
      var list = template.list(topics);
      var html = template.html(title, list,
          `<h2>${sanitizeHtml(title)}</h2>
          ${sanitizeHtml(description)}
          <p>by ${sanitizeHtml(topic[0].name)}</p>
          `,
          `<div id="btnArea"><a href="/topic/create">create</a>
          <a href="/topic/update/${request.params.pageId}">update</a>
          <form action="/topic/delete_process" method="post">
          <input type="hidden" name="id" value="${request.params.pageId}">
          <input type="submit" value="delete">
          </form></div></ol>
          `
      );
      response.send(html);
    });
  });
});

module.exports = router;
