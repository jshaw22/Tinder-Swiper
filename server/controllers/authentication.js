const User = require('../models/users');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
	//subject of the token is the .id. Use ID and not other properties 
	//(which can change). iat = issuedAt
	
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
	//give user a token. user should be auth'ed at this point thanks to the middleware 
	res.send({token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next) {
	const userName = req.body.userName;
	const password = req.body.password;

	if(!userName || !password) {
		return res.status(422).send({error: "You must provide a username and password"});
	}
	
	// See if a user with the given username exists
	User.findOne({userName: userName}, function (err, existingUser) {
	  // If a user with username does not exist, return an error
		if (err) {return next(err);}

		if(existingUser){
			return res.status(422).send({error: 'Username is already in use'});
		}

		// If a user with username does NOT exist, create and save user record
		const user = new User({
			userName: userName,
			password: password
		})

		user.save(function (err){
			if(err) {return next(err);}
		})

		// Respond to request indicating the user was created 
		res.json({token: tokenForUser(user)});
	});
}