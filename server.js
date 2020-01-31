var connect = require('connect');
var serveStatic = require('serve-static');
var connectRoute = require('connect-route');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = connect();

app.use(bodyParser.urlencoded({extended: false}));
let originE = {};
app.use((() => {

  return (req, res, next) => {
    originE = {req: req, res: res};
    next();
  }
})())

app.use(connectRoute(function (router) {
  router.post('/open', function (req, res, next) {
    res.end('open');
  });

  router.post('/save', (req, res, next) => {
    let writeStream = fs.createWriteStream(req.body.filename);

    writeStream.write(req.body.xml, 'utf-8');
    writeStream.on('finish', (data) => {
      console.log(writeStream);
      res.setHeader('Content-disposition', `attachment; ${__dirname}/${req.body.filename}`);
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.end(`http://${req.headers.host}/${req.body.filename}`);
    });

    writeStream.end();
  });
}));

app.use(serveStatic('./')).listen(80, function(){
  console.log('Server running on 80...');
});

// var connect = require('connect');
// var http = require('http');
// var serveStatic = require('serve-static');
// var bodyParser = require('body-parser');
// var port = 80;
// var app = connect();

// gzip/deflate outgoing responses
// var compression = require('compression');
// app.use(compression());

// store session state in browser cookie
// var cookieSession = require('cookie-session');
// app.use(cookieSession({
//   keys: ['secret1', 'secret2']
// }));

// parse urlencoded request bodies into req.body
// app.use(bodyParser.urlencoded({extended: false}));

// app.use('/', function(req, res, next){
//   res('index', {title: 'index'})
// });

//create node.js http server and listen on port
// app.use(connect.static(__dirname + '/'));
// app.listen(port);
