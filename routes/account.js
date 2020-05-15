var express = require("express"),
    router  = express.Router(),
    middleware = require("../middleware"),
    Konak = require("../models/konak");

//Cari Hesap Ayarları
   router.get("/",middleware.isLoggedIn, function (req,res){
      res.render("account/index"); 
   });


/*    Konak.estimatedDocumentCount, function(err,count){
      if(err){
         console.log(err);
      } else {
         res.render("account/index", {konak: count}); 
      }
   }
}); */

module.exports = router;