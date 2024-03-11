const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController')
const hospitalController = require('../controllers/hospitalController')
const authentication = require('../middleware/authentication');
const appointController = require('../controllers/appointmentController');
// const hospitalController = require('../controllers/hospitalController')
router.get('/', authentication.hospitalAuth, (req, res) => {
    res.render('hospital_dashboard');
});

// CRUD doctor
router.get("/doctor", doctorController.listDoctor);

router.get('/doctor/add', (req, res) =>{
    res.render('hos_addDoctor')
})
// router.post('/doctor/add', doctorController.createDoctor);

router.get('/doctor/update/:id', doctorController.updateDoctorGet)

router.put('/doctor/update/:id', doctorController.updateDoctorPost)

router.delete('/doctor/delete/:id',doctorController.deleteDoctor)
router.get('/doctor/delete/:id',doctorController.deleteDoctor)

router.post('/getSpecofHos', hospitalController.getSpecbyHosID)
router.post('/addNewDoctor', doctorController.createDoctor);

// Specialist
router.get('/specialist', (req, res) => {
    res.render('specialist');
})

router.get('/specialist/add/:id', (req, res) =>{
    res.render('addSpecialist', {id: req.params.id})
})
router.post('/specialist/add/:id', hospitalController.createSpecialist);

// router.get('/specialist/update/:id', feedbackController.updateFeedback)

// router.put('/specialist/update/:id', feedbackController.updateFeedbackPost)

router.delete('/specialist/delete/:id/:specName', hospitalController.deleteSpecialist)


router.get('/appointment', function(req, res){
    res.render('hospital_appointment');
})

router.post('/getAppofHos',appointController.getAppbyHosID);
module.exports = router;