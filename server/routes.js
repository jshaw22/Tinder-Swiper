var request = require('request');
var tinder = require('tinder');
var fs = require('fs');
var client = new tinder.TinderClient();
var _ = require('lodash');

//manual justin token needs to be programtically replaced 
var token = "EAAGm0PX4ZCpsBACjNakeJRJQk81l2lKk1lAAOHAG5lPetfa6BPUZClR9UAreSh2Q3GgOecriGYNEkdp51kCzf7m2ZCicd5UhReWDdiRZBRZCtps3UXSVRADr5fJ3hCetyow8DcciGWj1rIZCbZA7fTn1xozZBs7O2umQpp2mE9iak9ZBSfk2LgNc0vBjYIeCHArDVxRAZAR4kIYeCBuORZC1WHm9EycO1Pklv6OFmMAB4q8JQZDZD";

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
}
