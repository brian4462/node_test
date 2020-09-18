var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
var template = require('../lib/template.js');

router.get('', function(request, response){
  db.query(`SELECT * FROM topic`, function(error,topics){
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(topics);
    var html = template.html(title, list,
        `<h2>${title}</h2>${description}
        <img src="/images/hello.jpg" style="width:300px; display:block;">
        `,
        `<div id="btnArea"><a href="/topic/create">create</a></div></ol>`
    );
    response.send(html);
  });
});

module.exports = router;
