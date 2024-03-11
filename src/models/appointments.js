const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    appointmentID: String,
    patientID: String,
    profileID: String,
    hospitalID: String,
    doctorID: String,
    specialist: String,
    date: Date,
    time: Number,
});

const Appointment = mongoose.model("appointments", AppointmentSchema);
module.exports = Appointment;