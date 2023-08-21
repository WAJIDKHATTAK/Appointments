const Joi = require("joi");
const { objectId } = require("./custom.validation");

const register = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(32).required(),
		role: Joi.string(),
	}),
};
const login = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(32).required(),
	}),
};
const updatePassword = {
	params: Joi.object().keys({
		doctorId: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		password: Joi.string().min(8).max(32).required(),
		newPassword: Joi.string().min(8).max(32).required(),
		confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
	}),
};
const setDoctorAvailability = {
	params: Joi.object().keys({
		doctorId: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		status: Joi.string().valid("available", "unavailable").required(),
		fromTime: Joi.string()
			.regex(/^\d{2}:\d{2}$/)
			.required(),
		toTime: Joi.string()
			.regex(/^\d{2}:\d{2}$/)
			.required(),
	}),
};
module.exports = {
	register,
	login,
	updatePassword,
	setDoctorAvailability,
};
