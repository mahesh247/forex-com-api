var express = require('express')
var router = express.Router()
var superagent = require('superagent')
var cheerio = require('cheerio')
var MongoClient = require('mongodb').MongoClient
var MongoURL = "mongodb://stockxuser:stockxuser@ds125479.mlab.com:25479/stockx"
var CronJob = require('cron').CronJob

/* GET scrape listing. */
router.get('/', function(req, res, next) {
	new CronJob({
		cronTime: '* * * * *', // Minute Hour Date Month Day : Currently set to run every minute
		onTick: function() { // Do the job
			/* Fetch value from the url */
			//var url = 'https://www.nrb.org.np/fxmexchangerate.php?YY=&&MM=&&DD='
			var url = 'https://www.nrb.org.np/fxmexchangerate.php'

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

				$('table').each(function(i, element){
					var twidth = element.attribs.width
					if( twidth == 450 ) {
						$(element).find('tr').each(function(x, z){
							if(x > 1 && x < 22) {
								var myObj = {}
								myObj['currency'] = $(z).find('td').eq(0).text().trim()
								myObj['unit'] = $(z).find('td').eq(1).text().trim()
								myObj['buying'] = $(z).find('td').eq(2).text().trim()
								myObj['selling'] = $(z).find('td').eq(3).text().trim()
								rate.push(myObj)
							}
						})
					}
				})
				
				/* Insert to Database */
				MongoClient.connect(MongoURL, function(err, db) {
					if (err) throw err
					var dbo = db.db("stockx");
					dbo.collection("forex").insertMany(rate, function(err, res) {
						if (err) throw err
						console.log("Number of documents inserted: " + res.insertedCount)
						db.close()
					})
				})
			})
		},
		start: true, // Autostart set to true
		timeZone: 'Asia/Kathmandu' // Timezone set to Asia/Kathmandu
	})
})

module.exports = router