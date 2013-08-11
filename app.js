
/**
 * Module dependencies
 */

var express = require('express'),
  http = require('http'),
  path = require('path'),
  fs = require('fs');

var app = module.exports = express();
var server = require('http').createServer(app);
/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '')));

app.get('/:param?', function(req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});