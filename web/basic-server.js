var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var fs = require('fs')

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

// var setup = {
  
//   '/': function(request, response) {
//     fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', function(err, data) {
//       if (err) {throw err};
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(data);
//     });
//   },

//   '/styles.css': function(request, response) {
//     fs.readFile(path.join(__dirname, 'public', 'styles.css'), 'utf8', function(err, data) {
//       if (err) {throw err};
//       res.writeHead(200, {'Content-Type': 'text/css'});
//       res.end(data);
//     });
//   },
// }


var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

