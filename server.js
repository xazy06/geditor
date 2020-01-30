var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var port = 80;
var app = connect();

// gzip/deflate outgoing responses
// var compression = require('compression');
// app.use(compression());

// store session state in browser cookie
// var cookieSession = require('cookie-session');
// app.use(cookieSession({
//   keys: ['secret1', 'secret2']
// }));

app.use(serveStatic('./'))

// parse urlencoded request bodies into req.body
app.use(bodyParser.urlencoded({extended: false}));

// respond to all requests
app.use(function(req, res){
  res.end('Hello from Connect!\n');
});

//create node.js http server and listen on port
http.createServer(app).listen(port, function(){
  console.log(`Server running on ${port}...`);
});
