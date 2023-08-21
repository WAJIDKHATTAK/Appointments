/* eslint-disable no-unused-vars */
const winston = require("winston");
const config = require("./config");

//!converts stack traces from errors into readable messages
const enumerateErrorFormat = winston.format((info) => {
	if (info instanceof Error) {
		Object.assign(info, { message: info.stack });
	}
	return info;
});
//!create a logger instance
/*
 * //!Usage :
 *	//Todo: const logger = require("./logger");
 *	//Todo: logger.info("This is an info message.");
 *	//Todo: logger.error("This is an error message.");
 *	//Todo: logger.debug("This is a debug message.");
 */
const logger = winston.createLogger({
	level: config.env === "development" ? "debug" : "info",
	format: winston.format.combine(
		enumerateErrorFormat(),
		config.env === "development"
			? winston.format.colorize()
			: winston.format.uncolorize(),
		winston.format.splat(),
		winston.format.printf(({ level, message }) => `${level}: ${message}`),
	),
	transports: [
		new winston.transports.Console({
			stderrLevels: ["error"],
		}),
		//new winston.transports.File({ filename: "syslog.txt" }),
	],
});

module.exports = logger;
