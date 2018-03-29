var express = require('express')
var router = express.Router()
var superagent = require('superagent')
var cheerio = require('cheerio')
var MongoClient = require('mongodb').MongoClient
var MongoURL = "mongodb://stockxuser:stockxuser@ds125479.mlab.com:25479/stockx"

/* GET scrape listing. */
router.get('/', function(req, res, next) {
	
	var url = 'http://www.fenegosida.org/'

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

		var rate = {}
		var commodity = {}
		var things = []

		$('div').each(function(i, element){
			var className = element.attribs.class
			//console.clear()
			if(className == 'rate-gold post' || className == 'rate-silver post'){

				//console.log('className = ' + className )
				//console.log(element.children.length)
				$el = $(element)
				//var price = $el.find('b').text()
				//var price = $el.find('p').children().last().html()
				//console.log(price)
				
				var price = $el.find('b').text()
				//console.log(price)
				$el.find('b').remove()
				
				var measure = $el.find('span').text().replace(/Nrs/gi, "")
				//var somevar = $el.find('span').text()
				//console.log(measure)
				$el.find('span').remove()
				
				var name = $el.find('p').text().replace(/\/-/gi, "").trim()
				//console.log(name)
				
				var rate = new Object();
				rate.name = name;
				rate.price = price;
				rate.measure = measure;
				/*commodity = {
				    name: name,
				    price: price + ' ' + measure
				}

				rate = commodity*/
				//console.log(rate)
				

				if(Object.keys(rate).length == 3) {
					things.push(rate)
					//rate = {}
				}
			}
		})
		MongoClient.connect(MongoURL, function(err, db) {
			if (err) throw err;
			var dbo = db.db("stockx");
			dbo.collection("commodity").insertMany(things, function(err, res) {
				if (err) throw err;
				console.log("Number of documents inserted: " + res.insertedCount);
				db.close();
			});
		});
		
		//console.log('Rates: ' + JSON.stringify(things))

		res.send(things)
	})

})

module.exports = router
