/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const config = require("../Config/config");
const logger = require("../Config/logger");
const ApiError = require("../Utils/apiError");

const errorConverter = (err, req, res, next) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const statusCode =
			error.statusCode || error instanceof mongoose.Error
				? httpStatus.BAD_REQUEST
				: httpStatus.INTERNAL_SERVER_ERROR;
		const message = error.message || httpStatus[statusCode];
		error = new ApiError(statusCode, message, false, err.stack);
	}
	next(error);
};
const errorHandler = (err, req, res, next) => {
	let { statusCode, message } = err;
	if (config.env === "production" && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	}

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		...(config.env === "development" && { stack: err.stack }),
	};

	if (config.env === "development") {
		logger.error(err);
	}

	res.status(statusCode).send(response);
};
const customErrorMessage = (err, req, res, next) => {
	if (err.message === "invalid signature") {
		const message = `Json Web Token is invalid, Try again `;
		err = new ApiError(400, message);
	}
	if (err.message === "Error") {
		err = new ApiError(400, "Something went wrong");
	}
	if (err.message === "jwt malformed") {
		const message = `Jwt is invalid`;
		err = new ApiError(400, message);
	}
	if (err.message === "jwt expired") {
		const message = `Json web token has been expired `;
		err = new ApiError(400, message);
	}
	if (err.message === "Unexpected field") {
		const message = `Only one image allowed`;
		err = new ApiError(400, message);
	}
	next(err);
};

module.exports = {
	errorConverter,
	errorHandler,
	customErrorMessage,
};
