var restify = require('restify');
var models = require(__dirname + '/models.js');

var server = restify.createServer({
  name: 'ieee-app',
  version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

// =======================
// Routes
// =======================
server.get('/events', models.fetchEvents);
server.get('/events-upcoming', models.fetchEventsUpcoming);
server.get('/events-mongo', models.fetchEventsMongodb);
server.get('/about', models.fetchAbout);
server.get('/', models.sayHello);
server.get('/tasks', models.fetchTasks);
server.get('/cards', models.fetchAllTrelloBoards);
server.get('/boards', models.fetchAllTrelloBoards);
server.get('/sync-events', models.syncEvents);


server.listen(16906, function () {
  console.log('%s listening at %s', server.name, server.url);
});
