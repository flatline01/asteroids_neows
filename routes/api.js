var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* 
Main API
This route serves as middle ware to fetch info from the NASA api endpoint. 
We could fetch directly from the front end, but that would expose our key. Doing this lets us protect it. 

This end point takes two optional paramenters, start and end. If no parameters are passed, it will use today and 7 days ago as defaults.

To Do:
* modify the api response
    * there are a number of items in the response that are not currently used in the front end. We can
      destructure the response and recraft it. this should simplify the front end a bit and make the
      response more performant.
* cache responses
    * this could reduce number of lookups and hits to the api, as well as speed up response.
* error / checks
    * out of bounds errors
    * large dataset errors
    * bad date errors
* auth
    * referrer checks - lets make sure we arent acting as a relay for someone else to use our keys
    * registered users may be able to save particular items or searches

As this is currently just a demo, we can ignore most of this for now.
*/

router.get("/:start?/:end?", function(req,res,next){
    var today = new Date;
    var lastWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    var start = req.params.start || `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    var end = req.params.end || `${lastWeek.getFullYear()}-${lastWeek.getMonth() + 1}-${lastWeek.getDate()}`

    var endpoint = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${process.env.nasa_apikey} `

    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        let roids = []
        //lets take the returned object, and unroll it a bit. 
        Object.entries(data.near_earth_objects).forEach(entry => {
            //console.log("---",entry[1].length,"---")
            Object.entries(entry[1]).forEach(item=>{
                 //console.log("**",item[1].id)
                 roids.push(item[1]);
            })
        });
        //console.log(roids)


        res.json({
            start:start,
            end:end,
            timestamp: today,
            count: data.element_count,
            data:roids
        })
    })
})

console.log("   API loaded")
module.exports = router;