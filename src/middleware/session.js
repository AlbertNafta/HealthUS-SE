const Session = require('../models/sessions');

// check session timeout
exports.lastActive = (req, res, next) => {
    if (req.session && req.session.user) {
        req.session.lastActive = Date.now();
    }
    next();
}

exports.checkSessionTimeout = (req, res, next) => {
    if (req.session && req.session.user) {
        const timeLimit = 1000 * 10;
        if (Date.now() - req.session.lastActive > timeLimit) {
            req.session.destroy();
            res.redirect('/login');
        }
        else {
            next();
        }
    }
    else {
        res.redirect('/login');
    }
}

// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }

exports.getUsername = async (req, res, next) => {
    const sessionID = req.sessionID
    console.log(req.cookies)
    // const sessionID = req.cookies['sessionID'];
    // console.log('middleware', sessionID);

    await Session
    .findOne({_id: sessionID})
    .then(result => {
        console.log(result);
        res.locals.username = result.user.username;
        next();
    })
    .catch(err => {
        res.locals.username = null;
        next();
    });
}
