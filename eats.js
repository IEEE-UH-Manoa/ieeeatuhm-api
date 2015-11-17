var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');
var async = require('async');

var eats = [];

var scrapeEats = function(callback){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    page = "https://wiki.ieeeatuhm.com/doku.php?id=good_eats:start"

    request(page, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        // The TOC contains some trash elements that we get rid of here
        $('#dw__toc').remove();

        // Remove the desserts section so that we don't have to deal with
        // this later on. Might be useful for when we want to have
        // an endpoint that deals with desserts that people want.
        $(':contains("Teas/Desserts/Acai Bowls")').next().remove();

        food_list = $('.li').not('h1,h2');
        food_list = _.map(food_list, function(food){
            return $(food).text().trim();
        });

        callback(null, food_list);
      }
      else{
        callback(error); }
    });
}

var getRandomEat = function(callback){
    var random = function(array){
        return array[Math.floor(Math.random()*array.length)];
    }
    if(eats.length > 0) {
        callback(null, random(eats));
    }
    else{
        scrapeEats(function(err, results){
            eats = results;
            callback(null, random(eats));
        });
    }
}

module.exports = {
    getEats: function(req, res, next){
        var n = 1;
        if(req.params.n != null)
            n = parseInt(req.params.n);

        var eats = Array(n)
        async.map(eats,
            function(item, callback){
                getRandomEat(function(err, result){
                    callback(null, result);
                });
            },
            function(err, result){
                res.send(result);
                return next();
        });
    },
    getEat: function(req, res, next){
        getRandomEat(function(err, result){
            res.send(result);
            return next();
        });
    },
    syncEats: function(req, res, next){
        scrapeEats(function(err, food_list){
            if(!err){
                eats = food_list;
                res.send(food_list);
            }
            else console.log(err);
            return next();
        });
    }
}
