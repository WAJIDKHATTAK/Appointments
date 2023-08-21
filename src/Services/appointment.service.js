const Appointment = require("../Models/appointment.model");
const User = require("../Models/user.model");
const Doctor = require("../Models/doctor.model");
const httpStatus = require("http-status");
const ApiError = require("../Utils/apiError");

const checkDoctorAvailability = async (doctorId) => {
	try {
		const doctor = await Doctor.findById(doctorId);
		if (!doctor) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Doctor Not Found!!!");
		}
		const availability = {
			status: doctor.availability.status,
			fromTime: doctor.availability.fromTime,
			toTime: doctor.availability.toTime,
		};
		return availability;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const checkDoctorFreeSlots = async (doctorId) => {
	try {
		const doctor = await Doctor.findById(doctorId);
		if (!doctor) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Doctor not found");
		}

		const availableSlots = [];
		const appointmentSlots = new Set();

		// Calculate appointment slots
		for (const appointment of doctor.appointments) {
			const appointmentTime = appointment.appointmentTime;
			appointmentSlots.add(appointmentTime);
		}

		// Calculate free slots based on doctor's availability
		const fromHour = parseInt(doctor.availability.fromTime.split(":")[0]);
		const toHour = parseInt(doctor.availability.toTime.split(":")[0]);

		for (let hour = fromHour; hour < toHour; hour++) {
			const slotStart = `${hour.toString().padStart(2, "0")}:00`;
			const slotEnd = `${(hour + 1).toString().padStart(2, "0")}:00`;

			if (!appointmentSlots.has(slotStart)) {
				availableSlots.push({
					appointmentSlot: `${slotStart}-${slotEnd}`,
				});
			}
		}

		return availableSlots;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const createAppointment = async (userId, doctorId, appointmentTime) => {
	try {
		const user = await User.findById(userId);
		const doctor = await Doctor.findById(doctorId);

		if (!user || !doctor) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				"User or Doctor not found",
			);
		}

		// Check if the appointmentTime is available
		const isSlotAvailable = await checkDoctorFreeSlots(
			doctorId,
			appointmentTime,
		);
		if (!isSlotAvailable) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				"Selected slot is not available",
			);
		}

		// Create the appointment
		const appointment = await Appointment.create({
			user: user._id,
			doctor: doctor._id,
			appointmentTime,
		});

		// Update the doctor's appointments array with the new appointment
		doctor.appointments.push({
			appointmentTime,
			appointmentId: appointment._id,
		});
		await doctor.save();

		user.appointments.push({
			appointmentTime,
			appointmentId: appointment._id,
		});
		await user.save();

		return appointment;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const deleteAppointment = async (userId, appointmentId) => {
	try {
		const user = await User.findById(userId);
		const appointment = await Appointment.findById(appointmentId);

		if (!user || !appointment) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				"User or Appointment not found",
			);
		}

		// Check if the appointment belongs to the user
		if (appointment.user.toString() !== userId) {
			throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
		}

		// Remove the appointment from the doctor's appointments array
		const doctor = await Doctor.findById(appointment.doctor);
		doctor.appointments = doctor.appointments.filter(
			(apt) => apt.appointmentId.toString() !== appointmentId,
		);
		await doctor.save();

		// Delete the appointment
		await appointment.remove();
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
