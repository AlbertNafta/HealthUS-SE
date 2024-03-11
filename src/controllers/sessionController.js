const Session = require("../models/sessions");
const Patient = require("../models/patients");

exports.getbyID = async (req, res) => {
    const sessionID = req.headers.authorization?.split(' ')[1].toString();

    await Session
    .findOne({_id: sessionID})
    .then(result => {
        if (result == null) {
            res.status(404).json({
                message: "Session not found with id=" + sessionID
            });
        }
        else {
            res.status().status(200).json({
                session: result.session
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Error retrieving Session with id=" + sessionID
        });
    });
}

exports.logOut = async (req, res) => {
    const { sid } = req.body;
    
    await Session
    .deleteOne({ _id: sid })
    .then(result => {
        res.json({
            message: "Session successfully deleted"
        });
    })
}
