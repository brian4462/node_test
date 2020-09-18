var express = require('express');
var app = express();

var url = require('url');
var qs = require('querystring');
var db = require('./lib/db.js');
var template = require('./lib/template.js');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic.js');
var authorRouter = require('./routes/author.js');
var indexRouter = require('./routes/index.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());

app.use('/topic',topicRouter);
app.use('/author',authorRouter);
app.use('/',indexRouter);
// app.get('*',function(request, response, next){
//   db.query(`SELECT * FROM topic`, function(error,topics){
//     request.query = '';
//   }
//  next();
// });

//미들웨어는 순서대로 실행되기 때문에 404에러는 마지막에 위치한다
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, () => console.log('main.js start success on 3000!'));
