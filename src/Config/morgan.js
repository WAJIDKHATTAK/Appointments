/* eslint-disable no-unused-vars */
const morgan = require("morgan");
const config = require("./config");
const logger = require("./logger");
// !Define a custom token to include error messages in logs
morgan.token("message", (req, res) => res.locals.errorMessage || "");
// !Function to get IP format based on the environment
const getIpFormat = () => (config.env === "production" ? ":remote-addr -" : "");
// !Formats for successful and error responses
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
// TODO:Middleware for logging successful responses
const successHandler = morgan(successResponseFormat, {
	skip: (req, res) => res.statusCode >= 400,
	stream: { write: (message) => logger.info(message.trim()) },
});
// TODO:Middleware for logging error responses
const errorHandler = morgan(errorResponseFormat, {
	skip: (req, res) => res.statusCode < 400,
	stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
	successHandler,
	errorHandler,
};
