const doctorService = require("../Services/doctor.service");
const httpStatus = require("http-status");
const ApiError = require("../Utils/apiError");

const registerDoctor = async (req, res ) => {
	try {
		const doctorBody = req.body;
		const doctor = await doctorService.register(doctorBody);
		res.status(httpStatus.CREATED).json(doctor);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const loginDoctor = async (req, res) => {
	try {
		const doctorBody = req.body;
		const result = await doctorService.login(doctorBody);
		res.status(httpStatus.OK).json(result);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const updateDoctorPassword = async (req, res) => {
	try {
		const { doctorId } = req.params;
		const doctorBody = req.body;
		const updatedDoctor = await doctorService.updatePassword(
			doctorId,
			doctorBody,
		);
		res.status(httpStatus.OK).json(updatedDoctor);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const setDoctorAvailability = async (req, res) => {
	try {
		const { doctorId } = req.params;
		const { status, fromTime, toTime } = req.body;
		const doctor = await doctorService.setDoctorAvailability(
			doctorId,
			status,
			fromTime,
			toTime,
		);
		res.status(httpStatus.OK).json(doctor);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

module.exports = {
	registerDoctor,
	loginDoctor,
	updateDoctorPassword,
	setDoctorAvailability,
};
