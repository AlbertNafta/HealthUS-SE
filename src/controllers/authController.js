const Account = require("../models/accounts");

exports.roleAuth = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);

    Account
    .findOne({ username: username, password: password })
    .then(account => {
        if (account) {
            req.session.user = {};
            req.session.user.username = account.username;
            res.set('Set-Cookie', 'sessionID=' + req.sessionID);
            
            if (account.role === 0) {
                req.session.user.role = 'admin';
                res.redirect('/admin');
            }
            else if (account.role === 2) {
                req.session.user.role = 'hospital';
                res.redirect('/hospital');
            }
            else {
                req.session.user.role = 'patient';
                res.redirect('/');
                // console.log(req.sessionID);
                // res.send('Logged in');
            }
        }
        else {
            throw new Error('Username or password is incorrect');
        }
    })
    .catch(err => {
        console.error('From auth', err);
        res.status(400).send(err.message);
    })
}