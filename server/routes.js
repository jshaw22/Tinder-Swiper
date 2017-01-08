var request = require('request');
var tinder = require('tinder');
var fs = require('fs');
var client = new tinder.TinderClient();
var _ = require('lodash');

//manual justin token needs to be programtically replaced 

var token = "EAAGm0PX4ZCpsBAFv7p7Qt4ZBXPAHWk8aH1lL3X5eJnJwH7VQUoiYKTURkHt2nTAeT33AhMeV1wd4DIQlZA68MHeJZA3Lel1lGEjl3lWF3M1EUsDSGd6rkBpCZBo6DGSkR1oLIaKp4ONWwRSIwovNxcZCoAvbt6dOAxOJfNtvR5CdFAwHwZAYf9UpFGEPvdKUv7mZA3CJHGzEE4ZC0QQwOQ6jV2GhYzSY6SaWgqF2J4EPQEQZDZD";

module.exports = function (app) {
	app.post('/matches', function(req, res) {
		client.authorize(
			token,
			req.body.userID,
			function(){
				client.getRecommendations(10, function(err, data) {
					if (err)
						throw new Error('Error fetching recommendations');
					console.log("here be data", data.results[0]);
					res.send(data.results[0]);
				});
			});
	});

	app.post('/likes', function(req, res) {
		var matchID = req.body.id
		client.authorize(
			token,
			req.body.userID,
			function(){
				client.like(matchID, function(err, data){
					if(err){
						throw new Error('Error liking the match');
					}
					console.log("sending off data", data)
					res.send(data);
				});
			});
	});
}
