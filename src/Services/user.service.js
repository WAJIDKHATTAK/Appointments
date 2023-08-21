const User = require("../Models/user.model");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const ApiError = require("../Utils/apiError");
const generateJwtToken = require("../Config/generateToken");

const register = async (userBody) => {
	try {
		return await User.create(userBody);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const login = async (userBody) => {
	const user = await User.findOne({ email: userBody.email });
	if (!user) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Credentials Invalid");
	}
	const checkPassword = await user.isPasswordMatch(userBody.password);
	if (!checkPassword) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Credentials Invalid");
	}
	const token = generateJwtToken(user._id, "user");
	const result = { token, user };
	return result;
};
const updatePassword = async (userId, userBody) => {
	try {
		const user = await User.findOne(userId);
		if (!user) {
			throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
		}
		const checkPassword = await User.isPasswordMatch(userBody.password);
		if (!checkPassword) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Password");
		}

		const hashPassword = await bcrypt.hash(userBody.newPassword, 10);
		const updateUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { password: hashPassword } },
			{ new: true },
		);
		return updateUser;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

module.exports = {
	register,
	login,
	updatePassword,
};
