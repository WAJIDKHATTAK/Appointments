const userService = require("../Services/user.service");
const httpStatus = require("http-status");
const ApiError = require("../Utils/apiError");

const registerUser = async (req, res) => {
	try {
		const userBody = req.body;
		const user = await userService.register(userBody);
		res.status(httpStatus.CREATED).json(user);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const loginUser = async (req, res) => {
	try {
		const userBody = req.body;
		const result = await userService.login(userBody);
		res.status(httpStatus.OK).json(result);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const updateUserPassword = async (req, res) => {
	try {
		const { userId } = req.params;
		const userBody = req.body;
		const updatedUser = await userService.updatePassword(userId, userBody);
		res.status(httpStatus.OK).json(updatedUser);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

module.exports = {
	registerUser,
	loginUser,
	updateUserPassword,
};
