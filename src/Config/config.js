/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string()
			.valid("production", "development", "test")
			.required(),
		ROOT_PATH: Joi.string().required(),
		MONGODB_URL: Joi.string().required().description("MongoDB URL..."),
		PORT: Joi.number(),
		JWT_SECRET: Joi.string(),
		SMTP_HOST: Joi.string().description("server that will send the emails"),
		SMTP_USERNAME: Joi.string().description("username for email server"),
		SMTP_PASSWORD: Joi.string().description("password for email server"),
		EMAIL_FROM: Joi.string().description(
			"the from field in the emails sent by the app",
		),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: "key" } })
	.validate(process.env);

if (error) {
	throw new Error(`Config Validation Error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	rootPath: envVars.ROOT_PATH,
	port: envVars.PORT,
	mongoose: {
		url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
		options: {
			// useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
	email: {
		smtp: {
			host: envVars.SMTP_HOST,
			auth: {
				user: envVars.EMAIL_FROM,
				pass: envVars.SMTP_PASSWORD,
			},
		},
		from: envVars.EMAIL_FROM,
	},
	JWT_SECRET: envVars.JWT_SECRET,
	maxReserverSlotsPerDay: envVars.MAX_SLOTS_PER_DAY,
};
