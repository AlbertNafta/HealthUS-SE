require('dotenv').config();
const Account = require("../models/accounts")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const Patient = require("../models/patients")

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = async (too, url) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'ltquan21@clc.fitus.edu.vn',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'ltquan21@clc.fitus.edu.vn',
            to: too,
            subject: 'Reset your password',
            text: 'Concho coka',
            html: `<h1>Please click the link to reset your password</h1>
            <a href=${url}>${url}</a>`
        };

        const result = await transport.sendMail(mailOptions);

        return result;

    } catch (error) {
        console.log('Error: ', error);
        return error;
    }
}

exports.signupAccount = async (req, res) => {
    await Account.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: 1
    });
    count = await Patient.countDocuments() + 1
    count = count.toString().padStart(4, '0')
    await Patient.create({
        username: req.body.username,
        idUser: "pat" + count,
        name: req.body.name,
        phone: req.body.phone
    })
    res.redirect('/login')
}
exports.signupAccount = async (req, res) => {
    const { username, password, email, role } = req.body;

    // Check if the username already exists
    const existingUsername = await Account.findOne({ username });
    const existingEmail = await Account.findOne({ email });
    let errorMessage1 = ''; // Initialize errorMessage1
    let errorMessage2 = '';
    if (existingUsername) {
        errorMessage1 = 'Username already exists. Please choose a different one.';
        res.render('signup', {
            errorMessage1: errorMessage1, // Pass errorMessage1 to the view
            username: username,
            password: password,
            email: email,
            role: role
        });
    }
    else if (existingEmail) {
        errorMessage2 = 'Email already exists. Please choose a different one.';
        res.render('signup', {
            errorMessage2: errorMessage2, // Pass errorMessage1 to the view
            username: username,
            password: password,
            email: email,
            role: role
        });
    }
    else if (existingEmail && existingUsername) {
        errorMessage1 = 'Username already exists. Please choose a different username.';
        errorMessage2 = 'Email already exists. Please choose a different email.';
        res.render('addAccount', {
            errorMessage1: errorMessage1, // Pass errorMessage1 to the view
            errorMessage2: errorMessage2,
            username: username,
            password: password,
            email: email,
            role: role
        });
    } else {
        try {
            await Account.create({
                username,
                password,
                email,
                role: 1,
            });
            count = await Patient.countDocuments() + 1
            count = count.toString().padStart(4, '0')
            await Patient.create({
                username: req.body.username,
                idUser: "pat" + count,
                name: req.body.name,
                phone: req.body.phone
            });
            res.redirect('/login');
        }catch (error) {
            console.error('Error creating account:', error);
            // Render an error page or handle the error as needed
        }
    } 
}

exports.listAccount = async (req, res) => {
    const account = await Account.find()
    res.render('account', { account })
}

exports.createAccount = async (req, res) => {
    const { username, password, email, role } = req.body;

    // Check if the username already exists
    const existingUsername = await Account.findOne({ username });
    const existingEmail = await Account.findOne({ email });
    let errorMessage1 = ''; // Initialize errorMessage1
    let errorMessage2 = '';
    if (existingUsername) {
        errorMessage1 = 'Username already exists. Please choose a different username.';
        res.render('addAccount', {
            errorMessage1: errorMessage1, // Pass errorMessage1 to the view
            username: username,
            password: password,
            email: email,
            role: role
        });
    }
    else if (existingEmail) {
        errorMessage2 = 'Email already exists. Please choose a different email.';
        res.render('addAccount', {
            errorMessage2: errorMessage2, // Pass errorMessage1 to the view
            username: username,
            password: password,
            email: email,
            role: role
        });
    }
    else if (existingEmail && existingUsername) {
        errorMessage1 = 'Username already exists. Please choose a different username.';
        errorMessage2 = 'Email already exists. Please choose a different email.';
        res.render('addAccount', {
            errorMessage1: errorMessage1, // Pass errorMessage1 to the view
            errorMessage2: errorMessage2,
            username: username,
            password: password,
            email: email,
            role: role
        });
    } else {
        try {
            await Account.create({
                username,
                password,
                email,
                role
            });

            // Redirect to a success page or the account listing page
            res.redirect('/admin/account');
        } catch (error) {
            console.error('Error creating account:', error);
            // Render an error page or handle the error as needed
        }
    }
}

exports.updateAccount = async (req, res) => {
    try {
        const account = await Account.findOne({ _id: req.params.id })
        res.render('updateAccount', { account })
    } catch (error) { console.log(error) }
}

exports.updateAccountPost = async (req, res) => {
    try {
        await Account.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role
        })
        res.redirect('/admin/account')
    } catch { }
}

exports.deleteAccount = async (req, res) => {
    try {
        await Account.deleteOne({ _id: req.params.id });
        res.redirect('/admin/account')
    } catch (error) { }
}

const validateEmail = async (email) => {
    const account = await Account.findOne({ email: email })
    if (account) {
        return { username: account.username }
    }
    throw new Error('Email does not exist');
}

exports.forgotPassword = async (req, res) => {
    // url: /forgot-password
    const email = req.body.email;
    console.log('accController: ', email);

    let result = null;

    try {
        result = await validateEmail(email);
        if (result.username) {
            const secret = process.env.JWT_SECRET + result.username;
            const token = jwt.sign({ email: email, username: result.username }, secret, { expiresIn: '30s' });
            const url = `http://localhost:${process.env.PORT}/reset-password/${result.username}/${token}`;

            sendEmail(email, url)
                .then(res => console.log('Email sent...', res))
                .catch(err => console.log(err));

            res.send('Email sent');
        }
    } catch (error) {
        res.send('Email does not exist');
    }
}

const updatePassword = async (username, password) => {
    try {
        await Account
            .findOneAndUpdate({ username: username }, { password: password })
            .catch((error) => {
                throw new Error('Password update failed');
            });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.resetPassword = async (req, res) => {
    // url: /reset-password/:username/:token
    const { username, token } = req.params;
    const { password1, password2 } = req.body;

    if (password1 !== password2) {
        res.send('Passwords do not match');
    }
    else {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET + username);

            if (!payload) {
                res.send('Invalid token');
            }
            else {
                const result = await updatePassword(username, password1);
                if (result) {
                    res.send('Password updated');
                }
                else {
                    res.send('Password update failed');
                }
            }

        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}