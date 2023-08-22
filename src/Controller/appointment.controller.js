const appointmentService = require("../Services/appointment.service");
const httpStatus = require("http-status");
const ApiError = require("../Utils/apiError");

const checkDoctorAvailability = async (req, res) => {
	try {
		const { doctorId } = req.params;
		const availability =
			await appointmentService.checkDoctorAvailability(doctorId);
		res.status(httpStatus.OK).json(availability);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const checkDoctorFreeSlots = async (req, res) => {
	try {
		const { doctorId } = req.params;
		const availableSlots =
			await appointmentService.checkDoctorFreeSlots(doctorId);
		res.status(httpStatus.OK).json(availableSlots);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

// const createAppointment = async (req, res) => {
// 	try {
// 		const { userId , doctorId } = req.params; // Assuming you have user authentication middleware
// 		// const {fromTime,toTime} = req.body;
// 		const appointment = await appointmentService.createAppointment(
// 			userId,
// 			doctorId,
// 			req.body,
// 		);
// 		res.status(httpStatus.CREATED).json(appointment);
// 	} catch (error) {
// 		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
// 	}
// };
const createAppointment = async (req, res) => {
	try {
		const { userId, doctorId } = req.params;
		const { fromTime, toTime } = req.body; // Assuming the request body includes "fromTime" and "toTime"
		const appointmentTime = { fromTime, toTime };

		const appointment = await appointmentService.createAppointment(
			userId,
			doctorId,
			appointmentTime,
		);

		res.status(httpStatus.CREATED).json(appointment);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const deleteAppointment = async (req, res) => {
	try {
		const { userId, appointmentId } = req.params;

  const appointment = await appointmentService.deleteAppointment(
    userId,
    appointmentId
  );

  res.status(httpStatus.OK).json(appointment);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

module.exports = {
	checkDoctorAvailability,
	checkDoctorFreeSlots,
	createAppointment,
	deleteAppointment,
};
