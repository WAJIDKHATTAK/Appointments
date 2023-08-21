const Joi = require("joi");
const { objectId } = require("./custom.validation");

const checkDoctorAvailability = {
	params: Joi.object().keys({
		doctorId: Joi.required().custom(objectId),
	}),
};
const checkDoctorFreeSlots = {
	params: Joi.object().keys({
		doctorId: Joi.required().custom(objectId),
	}),
};
const createAppointment = {
	params: Joi.object().keys({
		userId: Joi.required().custom(objectId),
		doctorId: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		fromTime: Joi.string()
			.regex(/^\d{2}:\d{2}$/)
			.required(),
		toTime: Joi.string()
			.regex(/^\d{2}:\d{2}$/)
			.required(),
	}),
};
const deleteAppointment = {
	params: Joi.object().keys({
		userId: Joi.required().custom(objectId),
		appointmentId: Joi.required().custom(objectId),
	}),
};
module.exports = {
	checkDoctorAvailability,
	checkDoctorFreeSlots,
	createAppointment,
	deleteAppointment,
};
