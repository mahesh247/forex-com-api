var express = require('express');
//var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date()
  var year = date.getFullYear()
  res.render('index', { title: 'NP Forex Commodity App', year: year });
  //res.sendFile(path.join(__dirname+'/index.html'));
});

module.exports = router;
