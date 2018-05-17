var fs= require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
//var index = require('./public/index.html')
// require more modules/folders here!

var storage = [];

var respond = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, {'Content-Type': 'text/html'});
  data = data || archive.paths.loading;
  response.end(data);
}

exports.handleRequest = function (request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // refactor response.end (currently doesn't have body/data) ?
  // specify response headers
  // specify response statusCode
  // writeHead of response 
  // set response encoding ('utf8') so data is text; can set in .end (2nd arg);
  // if data is supplied to response.end, equivalent to calling response.write(data, encoding)
    // followed by response.end(callback)
  //response.end(archive.paths.list, 'utf8');
  if (request.method === 'GET') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', function(err, data) {
      if (err) {throw err};
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
    });

  } else if (request.method === 'POST') {
    console.log('this hit')
      request.on('data', (chunk) => {
        // if data is not in storage
        var site = chunk.toString().substring(4);
        console.log('site: ', site)
        if (!storage.includes(site)) {
          //add data to archives
          storage.push(site);
          fs.writeFile(archive.paths.list, JSON.stringify(storage), function(err) {
            if (err) {throw err;}
          });
          //give loading.html
          fs.readFile(path.join(__dirname, 'public', 'loading.html'), 'utf8', function(err, data) {
            console.log('data: ', data);
            if (err) {throw err};
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
          });
          //make new data file in sites folder

        }
        console.log(chunk.toString())
        archive.addUrlToList(chunk, fs.writeFile);

        
    // else if data is in archives
      //load data file
      })
      
  } 
  
};
