var http = require('http');
var fs = require('fs');
var path = require('path');

var errorCallback;
var server;
var port = 3000;

module.exports.listenForErrors = function(callback) {
  errorCallback = callback;
};

var start = module.exports.start = function(script) {
  var endpoint = "http://localhost:" + port;
  if (server) return endpoint;

  server = http.createServer(function(req, res) {
    if (/log/.test(req.url)) {
      if (errorCallback) {
        var paths = req.url.split('?');
        var rawErr = paths[paths.length - 1].split('=')[1];
        var err = JSON.parse(decodeURIComponent(rawErr));
        errorCallback(err);
      }
      res.end();
    } else if (/js/.test(req.url)) {
      fs.readFile(path.join(__dirname, '../uhoh.js'), function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end(data);
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('<!doctype html>\
                <html>\
                  <head>\
                    <title>test</title>\
                    <script src="/js/uhoh.js"></script>\
                  </head>\
                  <body style="background:#000;">\
                    <script>\
                      ('+script.toString()+')();\
                    </script>\
                  </body>\
                </html>');
    }
  });
  server.listen(port);
  return endpoint;
};

start(function() {
  uhoh('/logs');
  throw new Error('uh oh');
});
