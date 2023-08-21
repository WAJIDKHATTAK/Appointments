const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");
const validate = require("../Middleware/validate");
const userValidation = require("../Validations/user.validation");

router.post(
	"/register",
	validate(userValidation.registerUser),
	userController.registerUser,
);
router.post(
	"/login",
	validate(userValidation.loginUser),
	userController.loginUser,
);
router.put(
	"/update-password/:userId",
	validate(userValidation.updateUserPassword),
	userController.updateUserPassword,
);

module.exports = router;
