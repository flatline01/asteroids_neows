var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/dist/index.html', { root: __dirname });
});

router.get("/testroute", function(req,res,next) {
  res.send("ok")
})

console.log("   Index loaded")
module.exports = router;
