var express = require('express');
var request = require("request");
var cors = require('cors');
var app = express();

var port = process.env.PORT || 8080; //Useful for Heroku hosting
var api_key = "RGAPI-e964509e-3677-4f41-ad2a-47d9c0d46e20" //My API key

app.use(cors()); //Disables CORS
app.use(express.static(__dirname+'/public')); //Makes "summoner" folder a static folder


//Get the free champion rotation from Riot's servers.
app.get('/championRotation', function(req, res){
  request('https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key='+api_key, function (error, response, body) {
    res.jsonp(body);
  })
})

//API call to summoner data.
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

//API call to summoner rank.
app.get('/getRank/:region/:id', function(req, res){
	var region = req.params.region;
	var id = req.params.id;
	if (region == "euw") {
		region = "euw1";
	}
	URL = "https://"+region+".api.riotgames.com/lol/league/v4/positions/by-summoner/"+id+"?api_key=";
	request(URL+api_key, function (error, response, body) {
      res.jsonp(body);
    })
})



//Starts the server.
app.listen(port, function(){
  console.log("Node is listening on port "+port+"!");
});
