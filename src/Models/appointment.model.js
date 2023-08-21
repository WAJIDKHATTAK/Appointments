const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const mongoDuplicateKeyError = require("../Utils/mongoDuplicateKeyError");

const appointmentSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Doctor",
		},
		appointmentTime: {
			fromTime: {
				type: String, // Store as HH:mm format (e.g., "14:30")
			},
			toTime: {
				type: String,
			},
		},
		isCancelled: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

mongoDuplicateKeyError(appointmentSchema);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
