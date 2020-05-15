var express = require("express"),
    router = express.Router();

    router.get("/", function (req,res){
        res.render("../views/static/anasayfa");
    });

    router.get("/hakkimizda", function (req,res){
        res.render("../views/static/hakkimizda");
    });

    router.get("/hizmetlerimiz", function (req,res){
        res.render("../views/static/hizmetlerimiz");
    });

    router.get("/iletisim", function (req,res){
        res.render("../views/static/iletisim");
    });

    module.exports = router;