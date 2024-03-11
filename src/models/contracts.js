const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    contractEmail: {
        type: String,
        required: true
    },
});

const Contracts = mongoose.model("contracts", ContractSchema);
module.exports = Contracts;