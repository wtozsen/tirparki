var Konak = require("../models/konak");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //req.flash("error", "Giriş Yapmanız Gerekmektedir!");
    res.redirect("/signin");
};

module.exports = middlewareObj;