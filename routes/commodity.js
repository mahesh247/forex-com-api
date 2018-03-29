var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var MongoURL = "mongodb://stockxuser:stockxuser@ds125479.mlab.com:25479/stockx";
var limit = 6

/* GET home page. */
router.get('/', function(req, res, next) {
	var things = [];
	MongoClient.connect(MongoURL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("stockx");
		dbo.collection("commodity").find({}).sort({$natural : -1}).limit(limit).toArray(function(err, result) {
		if (err) throw err;
			things = result.reverse();
			res.send(things)
			db.close();
		});
	}); 
});

module.exports = router;