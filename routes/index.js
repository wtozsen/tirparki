var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("signin");
});


//show login form
router.get("/signin", function(req, res){
   res.render("signin"); 
});

//handling login logic
router.post("/signin", passport.authenticate("local", 
    {
        successRedirect: "/dashboard",
        failureRedirect: "/signin",
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/signin");
});


module.exports = router;