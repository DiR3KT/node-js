var express = require('express');
var request = require("request");
var cors = require('cors');
var app = express();

var port = process.env.PORT || 8080;
var api_key = "RGAPI-3f398299-aa33-4534-b453-7c3d76367ebe"

app.use(cors());


app.get('/', function(req, res){
  res.send("oui");
})

app.get('/championRotation', function(req, res){
  request('https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key='+api_key, function (error, response, body) {
    res.jsonp(body);
  })
})

var name;

app.get('/getData/:region/:name', function(req, res){
    var region = req.params.region;
    var name = req.params.name;
    if (region == "euw") {
      region = "euw1";
    }
    URL = "https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key=";
    request(URL+api_key, function (error, response, body) {
      res.jsonp(body);
    })

})

app.listen(port, function(){
  console.log("Node is listening on port "+port+"!");
});
