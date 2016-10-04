var request = require('request');
var tinder = require('tinderjs');
var fs = require('fs');
var client = new tinder.TinderClient();


module.exports = function (app) {
	app.post('/matches', function(req, res) {
		console.log("token and ID received", req.body)
		res.send("Post received");
	});

}