var express = require("express"),
    router  = express.Router(),
    middleware = require("../middleware"),
    Konak   = require("../models/konak");
    
//Rapor tablosu
router.get("/", middleware.isLoggedIn, function (req, res){
    Konak.find({got_cekici: {$ne: null}}).sort({cikis: "descending"}).exec(function(err,konak){
        if(err){
            console.log("Error!");
        } else {
            res.render("report/index", {konak: konak});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    Konak.findById(req.params.id, function(err, konak){
        if(err){
            console.log(err);
        }else {
        res.render("report/edit", {konak: konak});
    }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    // find and update the correct campground
    Konak.findByIdAndUpdate(req.params.id, req.body.konak, function(err, konak){
       if(err){
           res.redirect("/report");
       } else {
           //redirect somewhere(show page)
           res.redirect("/report");
       }
    });
});

// DESTROY CAMPGROUND ROUTE
    router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Konak.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/report");
      } else {
          res.redirect("/report");
      }
   });
});

module.exports = router;