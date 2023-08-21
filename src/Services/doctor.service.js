const Doctor = require("../Models/doctor.model");
const Appointment = require("../Models/appointment.model");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const ApiError = require("../Utils/apiError");
const generateJwtToken = require("../Config/generateToken");

const register = async (doctorBody) => {
	try {
		return await Doctor.create(doctorBody);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const login = async (doctorBody) => {
	const doctor = await Doctor.findOne({ email: doctorBody.email });
	if (!doctor) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Credentials Invalid");
	}
	const checkPassword = await doctor.isPasswordMatch(doctorBody.password);
	if (!checkPassword) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Credentials Invalid");
	}
	const token = generateJwtToken(doctor._id, "doctor");
	const result = { token, doctor };
	return result;
};
const updatePassword = async (doctorId, doctorBody) => {
	try {
		const doctor = await Doctor.findOne({_id: doctorId});
		if (!doctor) {
			throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
		}
		const checkPassword = await doctor.isPasswordMatch(doctorBody.password);
		if (!checkPassword) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Password");
		}

		const hashPassword = await bcrypt.hash(doctorBody.newPassword, 10);
		const updateDoctor = await Doctor.findOneAndUpdate(
			{ _id: doctorId },
			{ $set: { password: hashPassword } },
			{ new: true },
		);
		return updateDoctor;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const setDoctorAvailability = async (doctorId, status, fromTime, toTime) => {
	const update = {
		availability: { status, fromTime, toTime },
	};
	const doctor = await Doctor.findByIdAndUpdate(doctorId, update, {
		new: true,
	});
	if (status === "available") {
		await Appointment.updateMany(
			{
				doctor: doctorId,
				appointmentTime: { $gte: fromTime, $lte: toTime },
			},
			{ isCancelled: false },
		);
	} else if (status === "unavailable") {
		await Appointment.updateMany(
			{
				doctor: doctorId,
				appointmentTime: { $gte: fromTime, $lte: toTime },
			},
			{ isCancelled: true },
		);
	}

	return doctor;
};

module.exports = {
	register,
	login,
	updatePassword,
	setDoctorAvailability,
};
