const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require("../Middleware/auth");
const doctorController = require("../Controller/doctor.controller");
const validate = require("../Middleware/validate");
const doctorValidation = require("../Validations/doctor.validation");

router.post(
	"/register",
	requireSignin,
	authMiddleware,
	validate(doctorValidation.registerDoctor),
	doctorController.registerDoctor,
);
router.post(
	"/login",
	validate(doctorValidation.loginDoctor),
	doctorController.loginDoctor,
);
router.put(
	"/update-password/:doctorId",
	requireSignin,
	validate(doctorValidation.updateDoctorPassword),
	doctorController.updateDoctorPassword,
);
router.put(
	"/set-availability/:doctorId",
	requireSignin,
	authMiddleware,
	validate(doctorValidation.setDoctorAvailability),
	doctorController.setDoctorAvailability,
);

module.exports = router;
