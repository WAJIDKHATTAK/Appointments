/* eslint-disable no-unused-vars */
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("config");
const { tokenTypes } = require("./tokens");
const { User, Admin } = require("../models");
//* JWT authentication options
const jwtOptions = {
	//* JWT secret key
	secretOrkey: config.jwt.secret,
	//* Extract JWT from the Authorization header
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
//* JWT verification function
const jwtVerify = async (payload, done) => {
	try {
		if (
			payload.type !== tokenTypes.ACCESS &&
			payload.type !== tokenTypes.REFRESH
		)
			throw new Error("InValid Token Type...");

		//! Find user or admin based on the payload's subject (sub)

		const user = await User.findById(payload.sub);
		if (user) return done(null, user);

		const admin = await Admin.findById(payload.sub);
		if (admin) return done(null, admin);

		return done(null, false);
	} catch (error) {
		done(error, false);
	}
};
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
	jwtStrategy,
};
