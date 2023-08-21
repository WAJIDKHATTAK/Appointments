const rateLimit = require("express-rate-limit");
//! control the number of requests a client can make to a server within a specified time window.
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	skipSuccessfulRequests: true,
});

module.exports = {
	authLimiter,
};
