const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;

// create local strategy for signing in  
const localLogin = new LocalStrategy ( {usernameField:'userName'} , function (userName, password, done) {

	//verify this username and pw, call done with user
	//if it is correct username and pw
	// otherwise call done with false 
	User.findOne({userName: userName}, function(err, user) {
		if (err) {
			return done(err, false);
		}
		if(!user){
			return done(null, false);
		} 
		//compared pw's -- is password param equal to userpw? 
		user.comparePasswords(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}
			if(!isMatch){
				return done(null, false);
			}
			return done(null, user);
		})
	});
});

// Setup options for JWT strategy

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'), // look at header called authorization
	secretOrKey: config.secret
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	// see if userID in payload exists in our DB
	// if it does, call 'done' with that other 
	// otherwise, call done without a user object 

	User.findById(payload.sub, function (err, user) {
		if (err) {
			return done(err, false);
		}
		if (user){
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
