const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const mongoDuplicateKeyError = require("../Utils/mongoDuplicateKeyError");
const { roles } = require("../Config/role");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	role: {
		type: String,
		enum: roles,
		default: "user",
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
});

userSchema.plugin(toJSON);
userSchema.plugin(paginate);
mongoDuplicateKeyError(userSchema);

userSchema.methods.isPasswordMatch = async function (password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
