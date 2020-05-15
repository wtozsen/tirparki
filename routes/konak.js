var express = require("express");
var router  = express.Router();
var Konak = require("../models/konak");
var middleware = require("../middleware");
var flash = require("connect-flash");
var moment = require("moment");

//INDEX - show all plates
router.get("/", middleware.isLoggedIn,function(req, res){
    // Get all plates from DB
    Konak.find({ got_cekici: {$eq:null}}).sort({giris: "descending"}).exec(function(err, allkonak){
        if(err){
            console.log(err);
        } else {
            res.render("konak/index",{konak: allkonak});
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("konak/new"); 
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var get_cekici = req.body.konak.get_cekici;
    var dorse = req.body.konak.dorse;
    var firma = req.body.konak.firma;
    var mal = req.body.konak.mal;
    var giris = moment();
    var user = {
        id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    };
    
    var yeniKonak = {get_cekici: get_cekici, dorse: dorse, firma: firma, mal:mal, giris:giris,user:user};
    // Check whether the plate exist, if not its create a new DB entry
    Konak.findOne({"dorse": dorse}, function (err, dorseler){
        if(dorseler){
            req.flash("error", "Dorse Plakası Bulunmaktadır. Lütfen Plakayı Kontrol Edin!");
            res.redirect("/dashboard/new");
        } else {
            Konak.create(yeniKonak, function(err, yenikayit){
                if(err){
                    console.log(err);
                } else {
                    //redirect back to dashboard page
                    res.redirect("/dashboard");
                }
            });
        }
    })
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    Konak.findById(req.params.id, function(err, konak){
        if(err){
            console.log(err);
        }else {
            res.render("konak/edit", {konak: konak});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    // find and update the correct campground
    Konak.findByIdAndUpdate(req.params.id, req.body.konak, function(err, konak){
        if(err){
            res.redirect("/dashboard");
        } else {
            //redirect to dashboard
            res.redirect("/dashboard");
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.isLoggedIn,function(req, res){
    Konak.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/dashboard");
        } else {
            res.redirect("/dashboard");
        }
    });
});

// EXIT CAMPGROUND ROUTE
router.get("/:id/exit", middleware.isLoggedIn, function(req, res){
    Konak.findById(req.params.id, function(err, konak){
        if(err){
            console.log(err);
        }else {
            res.render("konak/exit", {konak: konak});
        }
    });
});

// EXIT UPDATE CAMPGROUND ROUTE
router.post("/:id", middleware.isLoggedIn, function(req, res){
    var cikis = moment();
    var got_cekici = req.body.konak.got_cekici;
    var user = {
        id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    };
    var yenicikis = {cikis: cikis, got_cekici: got_cekici, user: user};
    // find and update the correct item
    Konak.findByIdAndUpdate(req.params.id, yenicikis, function(err, konak){
        if(err){
            res.redirect("/dashboard");
        } else {
            //redirect somewhere(show page)
            res.redirect("/dashboard");
        }
    });
});


module.exports = router;