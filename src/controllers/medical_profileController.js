const MedicalProfiles = require('../models/medical_profiles');

exports.getMedProByPatID = async (req, res) => {
    const patID = req.body.user_id;

    await MedicalProfiles
    .find({patientID: patID})
    .then(result => {
        res.json({
            profiles: result
        });
    })
    .catch(err => {
        res.status(404).json({
            message: "Can not found any profiles of this account."
        });
    });
}