exports.adminAuth = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        console.log('Admin authentication passed');
        next();
    }
    else {
        console.log('Admin authentication failed');
        res.redirect('/login');
    }
}

exports.hospitalAuth = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'hospital') {
        console.log('Hospital authentication passed');
        next();
    }
    else {
        console.log('Hospital authentication failed');
        res.redirect('/login');
    }
}

exports.isLogged = (req, res, next) => {
    if (req.session.user) {
        console.log('Logged in');
        next();
    }
    else {
        console.log('Not logged in');
        // res.redirect('/login');
        res.render('Login');
    }
}
