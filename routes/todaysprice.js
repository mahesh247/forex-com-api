var express = require('express')
var router = express.Router()
var superagent = require('superagent')
var cheerio = require('cheerio')
var MongoClient = require('mongodb').MongoClient
var MongoURL = "mongodb://stockxuser:stockxuser@ds125479.mlab.com:25479/stockx"

/* GET scrape listing. */
router.get('/', function(req, res, next) {
	
	//var url = 'http://www.nepalstock.com/todaysprice'
	var url = 'http://www.nepalstock.com/todaysprice?_limit=500'

	superagent
	.get(url)
	.query()
	.end(function(err, response){
		if(err){
			res.json({
				confirmation: 'Failed',
				message: err
			})
			return
		}

		$ = cheerio.load(response.text)

		var rate = []
		var myObj = {}
		
		$('table').each(function(i, element){
			var table = element
			var td  = $(element).find('td:first-child label.pull-left').text().trim()
			myObj['time'] = td
			rate.push(myObj)
			$(table).find('tr').each(function(x, z){
				if(x > 0 ) {
				    myObj = {}
					myObj['sn'] = $(z).find('td').eq(0).text().trim()
					myObj['tc'] = $(z).find('td').eq(1).text().trim()
					myObj['maxp'] = $(z).find('td').eq(2).text().trim()
					myObj['minp'] = $(z).find('td').eq(3).text().trim()
					myObj['closingp'] = $(z).find('td').eq(4).text().trim()
					myObj['ts'] = $(z).find('td').eq(5).text().trim()
					myObj['amt'] = $(z).find('td').eq(6).text().trim()
					myObj['pclosing'] = $(z).find('td').eq(7).text().trim()
					myObj['pcldeffosing'] = $(z).find('td').eq(8).text().trim()
					rate.push(myObj)
				}
			})
		})
		MongoClient.connect(MongoURL, function(err, db) {
			if (err) throw err;
			var dbo = db.db("stockx");
			dbo.collection("todaysprice").insertMany(rate, function(err, res) {
				if (err) throw err;
				console.log("Number of documents inserted: " + res.insertedCount);
				db.close();
			});
		});

		res.send(rate)
	})

})

module.exports = router
