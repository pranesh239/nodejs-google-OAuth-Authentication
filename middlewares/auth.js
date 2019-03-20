exports.loginAuth = (req, res, next) => {

    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');

};

exports.guestCheck = (req, res, next) => {

    // if(req.isAuthenticated()){
    //    return res.redirect('/dashboard');
    // }
    return next();

};