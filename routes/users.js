var express = require("express"),
    router  = express.Router(),
    middleware = require("../middleware"),
    passport = require("passport"),
    User = require("../models/user");

//Kullanıcı ekleme çıkartma ve yetki verebilme
router.get("/", middleware.isLoggedIn, function (req, res){
   User.find({}, function(err,user){
       if(err){
           console.log("Error!");
       } else {
           res.render("users/index", {user: user});
       }
   });
});

// show register form
router.get("/register", middleware.isLoggedIn, function(req, res){
    res.render("users/register"); 
 });

 //handle sign up logic
router.post("/register",middleware.isLoggedIn, function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("users/index");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/users"); 
        });
    });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log(err);
        }else {
        res.render("users/edit", {user: user});
    }
    });
});

// UPDATE USER ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    // find and update the correct campground
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
       if(err){
           res.redirect("/users");
       } else {
           //redirect somewhere(show page)
           res.redirect("/users");
       }
    });
});

// DESTROY User ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
      if(err){
        console.log(err);
        res.redirect("/users");
      } else {
          res.redirect("/users");
      }
   });
});

module.exports = router;