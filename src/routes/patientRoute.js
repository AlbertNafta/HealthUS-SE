const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const medicalProfile = require('../controllers/medical_profileController');
const hospital = require('../controllers/hospitalController');
const doctor = require('../controllers/doctorController');
const appointment = require('../controllers/appointmentController');

router.get('/making-appointment', authentication.isLogged, (req, res) => {
    res.render('makeAppoint');
});

router.post('/getMedPro',medicalProfile.getMedProByPatID);
router.get('/getHos',hospital.getAllHospital);
router.post('/getSpecbyHosID',hospital.getSpecbyHosID);
router.post('/getDoctorbySpec', doctor.getDocbySpec);
router.post('/getScheofDoc', doctor.getScheofDoc);
router.post('/addAppointment', appointment.addAppointment);

module.exports = router;