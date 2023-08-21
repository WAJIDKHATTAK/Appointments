/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./Config/config");
const logger = require("./Config/logger");
const port = config.port || 5000;
//TODO Connect To MongoDB
let server;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
	logger.info("Connected to MongoDB");
	server = app.listen(port, () => {
		logger.info(`Listening to port ${port}`);
	});
});
//TODO EXIT Handler
const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info("Server Closed");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

//TODO Handle Unexpected Error
const unexpectedErrorHandler = (error) => {
	logger.error(error);
	exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
	logger.info("SIGTERM recieved");
	if (server) {
		server.close();
	}
});
