var request = require('request');
var tinder = require('tinder');
var fs = require('fs');
var client = new tinder.TinderClient();
var _ = require('lodash');

//manual justin token needs to be programtically replaced 
var token = "EAAGm0PX4ZCpsBABtFOWfA9WWZBSXV55ZCqVfERRyxZCMg6nLiZCDvcrBdO8uYFzw9WlKbFvi3RcWApUFlfa9Jf2YoQajFhJETvWSnvKN7TfwaaXOTGid3wYYAtE4y6TAgxrzH6R8uQk5LzuL7lzSLynZBiaEtOQXandQGBHRNUH0NRcmQalOO3v7pN6WErdDYJt6ZB4yJd7Pe6egG4j8jMGDbR0dNum8jh5pLjm6DYg8AZDZD";

module.exports = function (app) {
	app.post('/matches', function(req, res) {
		console.log("token and ID received", req.body)
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
		console.log("token and ID received", req.body)
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
}
