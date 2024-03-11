const Patient = require("../models/patients");

exports.getIDbyUsername = async (req, res) => {
    const username = req.body.username;

    await Patient
    .findOne({username: username})
    .then(result => {
        res.json({
            id: result.idUser
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Error retrieving Account ID with username=" + username
        });
    });
}