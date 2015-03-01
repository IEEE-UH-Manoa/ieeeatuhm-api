var restify = require('restify');
var Tabletop = require('tabletop');
var Trello = require("node-trello");
var t = new Trello(process.env.IEEE_TRELLO_KEY);

var mongo_URL = process.env.IEEE_MONGO_URL;
var collections = ['myevents'];
var db = require('mongojs').connect(mongo_URL, collections);


var server = restify.createServer({
  name: 'ieee-app',
  version: '0.0.1'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


// =======================
// Some Data
// =======================
var eventSheetURL = 'https://docs.google.com/spreadsheets/d/1RRZ_U3mcNJB3NpVmlW1F0KbIsJWkxmxMHgC8qYDchcs/pubhtml';
var aboutSheetURL = 'https://docs.google.com/spreadsheets/d/13VHmI6cCaqyxMpohc9gKj7-08D8Gdw7AWyrFfmnvdNE/pubhtml?gid=0&single=true';


// =======================
// Routes
// =======================
server.get('/events', fetchEvents);
server.get('/events-mongo', fetchEventsMongodb);
server.get('/about', fetchAbout);
server.get('/', sayHello);
server.get('/tasks', fetchTasks);
server.get('/cards', fetchAllTrelloBoards);
server.get('/boards', fetchAllTrelloBoards);


// =======================
// Descriptions
// =======================
function sayHello(req, res, next){
  res.send("Hello, World!");
  return next();
}


// Executive Board - 52d24b88a110cd7b3d37fcab
// In Progress List - 5410b46b66a71be7104f02a2
// Describes some of the current in-progress tasks
function fetchTasks(req, res, next){
  t.get("/1/lists/5410b46b66a71be7104f02a2/cards", function(err, data){
    var results = [];
    for(var i = 0; i < data.length; i++){
        results.push(data[i].name);
    }
    res.send(results);
  });
  return next();
}

function fetchAllTrelloCards(req, res, next){
  t.get("/1/boards/52d24b88a110cd7b3d37fcab/cards", function(err, data){
    res.send(data);
  });
  return next();
}

function fetchAllTrelloBoards(req, res, next){
  t.get("/1/organizations/ieeeatuhm/boards", function(err, data){
    res.send(data);
  });
  return next();
}

function fetchEventsMongodb(req, res, next){
    db.myevents.find(function(err, events){
        if(err){
            console.log("There was an error");
        }
        else{
            console.log(events);
        }
    }
    return next();
}

function fetchEvents(req, res, next){
  var options = {
    key: eventSheetURL,
    debug: true,
    callback: function(data, tabletop){
      res.send(data['2014-2015'].elements);
    }
  };

  Tabletop.init(options);
  return next();
}

function fetchAbout(req,res,next){
  var options = {
    key: aboutSheetURL,
    debug: true,
    simpleSheet: true,
    callback: function(data, tabletop){
      res.send(data);
    }
  };

  Tabletop.init(options);
  return next();
}


server.listen(16906, function () {
  console.log('%s listening at %s', server.name, server.url);
});
