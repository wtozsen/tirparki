var express = require("express"),
    router  = express.Router();

//Kapasite Raporu (Haftalık ve Aylık Raporlar)
router.get("/", function (req,res){
   res.render("capacity/index"); 
});

module.exports = router;