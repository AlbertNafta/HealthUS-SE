const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    username: String,
    hospitalID: String,
    name: String,
    location: String,
    city: String,
    contactNumber: String,
    email: String,
    website: String,
    description: String,
    specialists: {
        specName: String,
        specDescription: String
    },
    avatar: String
});

const Hospital = mongoose.model("hospitals", HospitalSchema);
module.exports = Hospital;