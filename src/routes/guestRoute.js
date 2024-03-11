const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController')
const newsController = require("../controllers/newsController");
const hospitalController = require("../controllers/hospitalController");
const authController = require("../controllers/authController");
const accController = require("../controllers/accountController");
const patController = require("../controllers/patientController");
const contractController = require('../controllers/contractController');
const doctorController = require('../controllers/doctorController');

// Partnership
router.get('/partnership', (req, res) => {
    res.render('Partnership');
});

// Home
router.get('/', (req, res) => {
    res.render('HomePage');
});

router.get('/latest-news', newsController.getLastestNews);

// Hospital List
router.get('/hospital-list', hospitalController.getHospitalList);
router.get('/hospital-list/query', hospitalController.getHospitalListbyQuery);

// Login
router.get('/login', (req, res) => {
    res.render('Login');
});
router.post('/login', authController.roleAuth);

// Sign up
router.get('/signup', (req, res) => {
    res.render('signUp');
});

router.post('/signup', accController.signupAccount);

// Forgot password
router.get('/forgot-password', (req, res) => {
    res.render('forgotPass');
});
router.post('/forgot-password', accController.forgotPassword);

// Reset password
router.get('/reset-password/:username/:token', (req, res) => {
    res.render('resetPass', { username: req.params.username, token: req.params.token });
});
router.post('/reset-password/:username/:token', accController.resetPassword);

//News
router.get('/news', (req, res) => {
    res.render('NewsPage');
});

// SingleNews
router.get('/single-news', (req, res) => {
    res.render('OnlyNews');
});

//AddContract
router.post('/contract-us', contractController.createContracts);

router.get('/contract-us', (req, res) => {
    res.render('AddContract');
});

//FAQs page
router.get('/FAQs', (req, res) => {
    res.render('FAQs');
});

// Get id by username
router.post('/getID', patController.getIDbyUsername);
router.get('/getUsn', sessionController.getbyID); // for getting username from sessionID (req.headers.authorization)

router.post('/getHosIDbyUsn', hospitalController.getIDbyUsername);

router.post('/getHosIDbyUsn', hospitalController.getIDbyUsername);
router.post('/getDocofHos',doctorController.getDocbyHosID);
// Logout
router.get('/logout', (req, res) => {
    res.redirect('/');
})
router.post('/logout', sessionController.logOut);

module.exports = router;