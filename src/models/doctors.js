const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    doctorID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    hospitalID: {
        type: String,
        required: true
    },
    specialist: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    yearExp: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    schedule: {
        type: Array,
        required: true
    }

});

const Doctor = mongoose.model("doctors", DoctorSchema);
module.exports = Doctor;