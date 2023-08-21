//! validate incoming request data against predefined schemas in
const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../Utils/pick");
const ApiError = require("../Utils/apiError");

const validate = (schema) => (req, res, next) => {
	let data = req.body;
	data = JSON.parse(JSON.stringify(data));
	req.body = data;
	const validSchema = pick(schema, ["params", "query", "body"]);
	const object = pick(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: "key" } })
		.validate(object);
	console.log(object);
	if (error) {
		const errorMessage = error.details
			.map((details) => details.message)
			.join(", ");
		return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
	}
	Object.assign(req, value);
	return next();
};

module.exports = validate;
