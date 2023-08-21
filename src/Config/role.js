// const roles = ["user", "admin"];
const roles = ["user", "doctor"];

//* User Authorization
const roleRights = new Map();

roleRights.set(roles[0], [
	"bookAppointment",
	"cancelAppointment",
	"viewSlots",
	"viewAvailability",
]);
roleRights.set(roles[1], ["cancelAppointments", "setAvailability"]);

module.exports = {
	roles,
	roleRights,
};
