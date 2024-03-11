const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    hospitalID: {
        type: String,
        required: true,
        unique: true
    },
    patientID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // rating: {
    //     type: String,
    //     required: true
    // }
});

const Feedback = mongoose.model("feedbacks", FeedbackSchema);
module.exports = Feedback;