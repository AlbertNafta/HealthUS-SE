const mongoose = require("mongoose");

const MedicalProfileSchema = new mongoose.Schema({
    profileID: String,
    patientID: String,
    name: String,
    phone: String,
    birth: Date,
    gender: Number,
    career: String,
    identity: String,
    email: String,
    address: String,
});

const MedicalProfile = mongoose.model("medical_profiles", MedicalProfileSchema);
module.exports = MedicalProfile;
