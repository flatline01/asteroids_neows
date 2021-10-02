var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.title= 'NeoWS Asteroids | Are you in danger?!';
  res.render('index');
});
console.log("   Index loaded")
module.exports = router;
