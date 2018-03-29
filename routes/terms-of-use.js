var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date()
  var year = date.getFullYear()
  res.render('terms-of-use', { title: 'Terms Of Use', year: year });
});

module.exports = router;
