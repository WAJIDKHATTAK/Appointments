const logger = require("../Config/logger");

module.exports = function (req, res, next) {
	logger.info(`Request URL: ${req.url}`);
	logger.info(`Request Body: ${JSON.stringify(req.body)}`);
	next();
};
