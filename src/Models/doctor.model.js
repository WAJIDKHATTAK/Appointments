const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const mongoDuplicateKeyError = require("../Utils/mongoDuplicateKeyError");
const { roles } = require("../Config/role");

const doctorSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		role: {
			type: String,
			enum: roles,
			default: "doctor",
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		availability: {
			status: {
				type: String,
				enum: ["available", "unavailable"],
				default: "unavailable",
			},
			fromTime: {
				type: String,
			},
			toTime: {
				type: String,
			},
		},
		appointments: [
			{
				fromTime: {
					type: String, // Store as HH:mm format (e.g., "14:30")
				},
				toTime: {
					type: String,
				},
				appointmentId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Appointment",
				},
			},
		],
	},
	{ timestamps: true },
);

doctorSchema.plugin(toJSON);
doctorSchema.plugin(paginate);

mongoDuplicateKeyError(doctorSchema);

/**
 * Check if passowrd matches the users's password
 * @params {string} password
 * @returns {Promise<boolean>}
 */
doctorSchema.methods.isPasswordMatch = async function (password) {
	const doctor = this;
	return bcrypt.compare(password, doctor.password);
};

doctorSchema.pre("save", async function (next) {
	const doctor = this;
	if (doctor.isModified("password")) {
		doctor.password = await bcrypt.hash(doctor.password, 10);
	}
	next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
