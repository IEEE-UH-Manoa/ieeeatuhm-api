var eats = [
    "Pho Saigon",
    "Teddy's Bigger Burgers",
    "McDonalds",
    "CPK"
]

module.exports = {
    getEats: function(req, res, next){
        var random_eats =  eats[Math.floor(Math.random()*eats.length)];
        res.send(random_eats);
        return next();
    }
}
