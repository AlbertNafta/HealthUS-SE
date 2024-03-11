const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    username: String,
    idUser: String,
    name: String,
    phone: String,
    avatar: String
});

const Patient = mongoose.model("patients", PatientSchema);
module.exports = Patient;
