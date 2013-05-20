var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  var fileMap = {
    '/main.css': {fileName: 'main.css', contentType: 'text/css'},
    '/additional.css': {fileName: 'additional.css', contentType: 'text/css'},
    '/main.js': {fileName: 'main.js', contentType: 'text/javascript'}
  };

  var file = fileMap[req.url];
  file = file || {fileName: 'index.html', contentType: 'text/html'};
  loadFile(res, file);
});

function loadFile(res, file) {
  console.info('loading file: ', file);
  res.writeHead(200, {'Content-Type': file.contentType});
  var fileStream = fs.createReadStream(file.fileName);
  fileStream.pipe(res);
}

var port = process.env.PORT || 3001;
console.info('starting telescope-client on port: ', port);
server.listen(port);