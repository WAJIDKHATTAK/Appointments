const express = require("express");
const router = express.Router();
const doctorRoute = require("./doctor.route");
const userRoute = require("./user.route");
const appointmentRoute = require("./appointment.route");

const defaultRoutes = [
	{
		path: "/doctor",
		route: doctorRoute,
	},
	{
		path: "/user",
		route: userRoute,
	},
	{
		path: "/appointment",
		route: appointmentRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
