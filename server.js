var restify = require('restify');
var Tabletop = require('tabletop');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


var testURL = 'https://docs.google.com/spreadsheets/d/1RRZ_U3mcNJB3NpVmlW1F0KbIsJWkxmxMHgC8qYDchcs/pubhtml';

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.get('/', function (req, res, next) {
  res.send("Hello, World!");
  return next();
});

server.get('/events', function (req, res, next) {

  var options = {
    key: testURL,
    debug: true,
    callback: function(data, tabletop){
      res.send(data['2014-2015'].elements);
      }
  };

  Tabletop.init(options);
  return next();

});

server.get('/about', function (req, res, next) {

  var options = {
    key: 'https://docs.google.com/spreadsheets/d/13VHmI6cCaqyxMpohc9gKj7-08D8Gdw7AWyrFfmnvdNE/pubhtml?gid=0&single=true',
    debug: true,
    simpleSheet: true,
    callback: function(data, tabletop){
      res.send(data);
    }
  };

  Tabletop.init(options);
  return next();

});

server.listen(16906, function () {
  console.log('%s listening at %s', server.name, server.url);
});
