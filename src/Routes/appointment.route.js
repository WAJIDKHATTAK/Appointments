const express = require("express");
const router = express.Router();
const appointmentController = require("../Controller/appointment.controller");
const validate = require("../Middleware/validate");
const appointmentValidation = require("../Validations/appointment.validation");
const { requireSignin } = require("../Middleware/auth");


router.get(
	"/check-availability/:doctorId",
	validate(appointmentValidation.checkDoctorAvailability),
	appointmentController.checkDoctorAvailability,
);
router.get(
	"/check-free-slots/:doctorId",
	validate(appointmentValidation.checkDoctorFreeSlots),
	appointmentController.checkDoctorFreeSlots,
);
router.post(
	"/create-appointment/user/:userId/doctor/:doctorId",
	requireSignin,
	validate(appointmentValidation.createAppointment),
	appointmentController.createAppointment,
);
router.delete(
	"/delete-appointment/:appointmentId",
	validate(appointmentValidation.deleteAppointment),
	appointmentController.deleteAppointment,
);

module.exports = router;
