var express = require('express');
var app = express();

var url = require('url');
var qs = require('querystring');
var db = require('./lib/db');
var template = require('./lib/template.js');
var topic = require('./lib/topic');
var author = require('./lib/author');

//미들웨어
var bodyParser = require('body-parser');
var compression = require('compression');
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());

//route, routing 길을따라 가다가 갈림길에서 적당한곳으로 방향을 잡는것
app.get('/', function(request, response){
  topic.home(request, response);
});
app.get('/page/:pageId', function(request, response){
  topic.page(request, response);
});
app.get('/create', function(request, response){
  topic.create(request, response);
});
app.post('/create_process', function(request, response){
  topic.create_process(request, response);
});
app.get('/update/:pageId', function(request, response){
  topic.update(request,response);
});
app.post('/update_process', function(request, response){
  topic.update_process(request, response);
});
app.post('/delete_process', function(request, response){
  topic.delete_process(request, response);
});
//author
app.get('/author', function(request, response){
  author.home(request,response);
});
app.post('/author/create_process', function(request, response){
  author.create_process(request, response);
});
app.get('/author/update/:authorId', function(request, response){
  author.update(request,response);
});
app.post('/author/update_process', function(request, response){
  author.update_process(request, response);
});
app.post('/author/delete_process', function(request, response){
  author.delete_process(request, response);
});

app.listen(3000, () => console.log('main.js start success on 3000!'));
