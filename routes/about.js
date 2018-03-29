var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date()
  var year = date.getFullYear()
  res.render('about', { title: 'About', year: year });
});

module.exports = router;