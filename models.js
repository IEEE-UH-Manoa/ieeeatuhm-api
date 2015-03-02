var Tabletop = require('tabletop');
var Trello = require("node-trello");

var t = new Trello(process.env.IEEE_TRELLO_KEY);

var mongo_URL = process.env.IEEE_MONGO_URL;
var collections = ['myevents'];
var db = require('mongojs').connect(mongo_URL, collections);

// =======================
// Some Data
// =======================
var eventSheetURL = 'https://docs.google.com/spreadsheets/d/1RRZ_U3mcNJB3NpVmlW1F0KbIsJWkxmxMHgC8qYDchcs/pubhtml';
var aboutSheetURL = 'https://docs.google.com/spreadsheets/d/13VHmI6cCaqyxMpohc9gKj7-08D8Gdw7AWyrFfmnvdNE/pubhtml?gid=0&single=true';


module.exports = {
    syncEvents: function(req, res, next){
      syncMongo(function(return_state){
        if(return_state === true ) res.send("Sync request success.");
        else res.send("ERROR: sync request failed.");
      });
      return next();
    },

    // =======================
    // Descriptions
    // =======================
    sayHello: function(req, res, next){
      res.send("Hello, World!");
      return next();
    },


    // Executive Board - 52d24b88a110cd7b3d37fcab
    // In Progress List - 5410b46b66a71be7104f02a2
    // Describes some of the current in-progress tasks
    fetchTasks: function(req, res, next){
      t.get("/1/lists/5410b46b66a71be7104f02a2/cards", function(err, data){
        var results = [];
        for(var i = 0; i < data.length; i++){
            results.push(data[i].name);
        }
        res.send(results);
      });
      return next();
    },

    fetchAllTrelloCards: function(req, res, next){
      t.get("/1/boards/52d24b88a110cd7b3d37fcab/cards", function(err, data){
        res.send(data);
      });
      return next();
    },

    fetchAllTrelloBoards: function(req, res, next){
      t.get("/1/organizations/ieeeatuhm/boards", function(err, data){
        res.send(data);
      });
      return next();
    },

    fetchEventsMongodb: function(req, res, next){
        db.myevents.find(function(err, events){
            if(err){
                console.log("There was an error");
            }
            else{
                res.send(events[0].events);
            }
        });
        return next();
    },

    fetchEvents: function(req, res, next){
      var options = {
        key: eventSheetURL,
        debug: true,
        callback: function(data, tabletop){
          res.send(data['2014-2015'].elements);
        }
      };

      Tabletop.init(options);
      return next();
    },

    fetchAbout: function(req,res,next){
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
}


function syncMongo(callback){
    console.log(String(new Date()) + ": Attempting to sync mongodb with sheet.");
    var options = {
        key: eventSheetURL,
        debug: true,
        callback: function(data, tabletop){
            // Smash the spreadsheet data onto the mongodb database (god help me)
            // TODO: replace this later with something sane
            db.myevents.update({}, { $set: {"events": data["2014-2015"].elements}}, function(err, saved){
                if(err){
                    console.log(String(new Date()) + ": There was an error syncing the db.");
                    callback(false);
                }
                else{
                    console.log(String(new Date()) + ": Success syncing the db.");
                    callback(true);
                }
            });
        }
    };
    Tabletop.init(options);
}

// Set the sync handler for every 10 minutes
var minutes = 10, the_interval = minutes * 60 * 1000;
setInterval(syncMongo, the_interval);
