var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var MongoURL = "mongodb://stockxuser:stockxuser@ds125479.mlab.com:25479/stockx";
var myobj

/* GET home page. */
/*router.get('/', function(req, res, next) {
	var CronJob = require('cron').CronJob
	new CronJob('* * * * * *', function() {
		var date = new Date()
		var year = date.getFullYear()
		var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		console.log(time)
	}, null, true, 'America/Los_Angeles');
});*/



/* GET home page. */
router.get('/', function(req, res, next) {
	var CronJob = require('cron').CronJob
	new CronJob('* * * * * *', function() {
		var date = new Date()
		var year = date.getFullYear()
		var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		myobj = { hours: date.getHours(), minutes: date.getMinutes() };
		console.log(time);
		/*MongoClient.connect(MongoURL, function(err, db) {
			if (err) throw err;
			var dbo = db.db("stockx");
			dbo.collection("timetest").insertOne(myobj, function(err, res) {
				if (err) throw err;
				console.log("Number of documents inserted: " + res.insertedCount);
				db.close();
			});
		});*/
	}, null, true, 'Asia/Kathmandu');
});


module.exports = router;