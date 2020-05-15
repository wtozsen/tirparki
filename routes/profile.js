var express = require("express"),
    router  = express.Router();

//Bunu koyacak mıyım bilmiyorum henüz ne gibi özellikler eklenebilir
router.get("/", function (req,res){
   res.render("profile/index"); 
});

module.exports = router;