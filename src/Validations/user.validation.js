const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const register = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required().custom(password),
	}),
};
const login = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
};
const updatePassword = {
	params: Joi.object().keys({
		userId: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		password: Joi.string().required().custom(password),
		newPassword: Joi.string().required().custom(password),
		confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
	}),
};

module.exports = {
	register,
	login,
	updatePassword,
};
