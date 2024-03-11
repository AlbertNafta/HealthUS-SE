const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController')
const hospitalController = require('../controllers/hospitalController')
const appointmentController = require('../controllers/appointmentController')
const feedbackController = require('../controllers/feedbackController')
const newsController = require('../controllers/newsController')
const contractController = require('../controllers/contractController')
const authentication = require('../middleware/authentication');

//Overview
router.get('/', authentication.adminAuth, (req, res) => {
    res.render('admin_dashboard');
});

//Account
router.get("/account", accountController.listAccount);

router.get('/account/add', (req, res) =>{
    res.render('addAccount')
})

router.post('/account/add', accountController.createAccount);

router.get('/account/update/:id', accountController.updateAccount)

router.put('/account/update/:id', accountController.updateAccountPost)

router.delete('/account/delete/:id',accountController.deleteAccount)

//Hospital
router.get("/hospital", hospitalController.listHospital);

router.get('/hospital/add', (req, res) =>{
    res.render('addHospital')
})
router.post('/hospital/add', hospitalController.createHospital);

router.get('/hospital/update/:id', hospitalController.updateHospital)

router.put('/hospital/update/:id', hospitalController.updateHospitalPost)

router.delete('/hospital/delete/:id',hospitalController.deleteHospital)

//Appointment
router.get("/appointment", appointmentController.listAppointment);

router.get('/appointment/add', (req, res) =>{
    res.render('addAppointment')
})
router.post('/appointment/add', appointmentController.createAppointment);

router.get('/appointment/update/:id', appointmentController.updateAppointment)

router.put('/appointment/update/:id', appointmentController.updateAppointmentPost)

router.delete('/appointment/delete/:id',appointmentController.deleteAppointment)

//Feedback
router.get("/feedback", feedbackController.listFeedback);

router.get('/feedback/add', (req, res) =>{
    res.render('addFeedback')
})
router.post('/feedback/add', feedbackController.createFeedback);

router.get('/feedback/update/:id', feedbackController.updateFeedback)

router.put('/feedback/update/:id', feedbackController.updateFeedbackPost)

router.delete('/feedback/delete/:id',feedbackController.deleteFeedback)

//News
router.get("/news", newsController.listNews);

router.get('/news/add', (req, res) =>{
    res.render('addNews')
})

router.post('/news/add', newsController.createNews);

router.get('/news/update/:id', newsController.updateNews)

router.put('/news/update/:id', newsController.updateNewslPost)

router.delete('/news/delete/:id', newsController.deleteNews)

//Contract
router.get("/contract", contractController.listContract);

router.get('/contract/update/:id', contractController.updateContract)

router.put('/contract/update/:id', contractController.updateContractlPost)

router.delete('/contract/delete/:id', contractController.deleteContract)

module.exports = router;