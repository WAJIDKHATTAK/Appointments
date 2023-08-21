/* eslint-disable no-unused-vars */
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../Utils/apiError");
const config = require("../Config/config");
const { Doctor, User } = require("../Models");
const { roleRights } = require("../Config/role");

const requireSignin = (req, res, next) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];
		const user = jwt.verify(token, config.JWT_SECRET);
		req.user = user;
	} else {
		throw new ApiError(httpStatus.BAD_REQUEST, "Authorization Required");
	}
	next();
};

const authMiddleware = (req, res, next) => {
	if (req.user.role !== "doctor") {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"You Do Not Have Access Rights",
		);
	}
	next();
};

const restrict = (...requiredRights) => {
	return (req, res, next) => {
		if (requiredRights.length) {
			const userRights = roleRights.get(req.user.role);
			const hasRequiredRights = requiredRights.every((requiredRight) =>
				userRights.includes(requiredRight),
			);
			if (!hasRequiredRights && req.params.userId !== req.user._id) {
				throw new ApiError(httpStatus.UNAUTHORIZED, "Forbidden");
			}
		}
		next();
	};
};

module.exports = {
	requireSignin,
	authMiddleware,
	restrict,
};
