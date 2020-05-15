var express         = require("express"),
    app             = express(),
    methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    moment          = require("moment"),
    momentTz        = require("moment-timezone"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    User            = require("./models/user"),
    mongoose        = require("mongoose");

//requring routes
var accountRoutes   = require("./routes/account"),
    konakRoutes     = require("./routes/konak"),
    indexRoutes     = require("./routes/index"),
    capacityRoutes  = require("./routes/capacity"),
    profileRoutes   = require("./routes/profile"),
    reportRoutes    = require("./routes/report"),
    settingsRoutes  = require("./routes/settings"),
    staticRoutes    = require("./routes/static"),
    usersRoutes     = require("./routes/users");

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/konak", { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.locals.moment = moment;
moment.tz.setDefault("Europe/Istanbul");

//Passport Config
app.use(require("express-session")({
    secret: "Rusty sosis gibi köpüş",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.sucess = req.flash("success");
   next();
});

app.use("/", staticRoutes);
app.use("/", indexRoutes);
app.use("/account", accountRoutes);
app.use("/capacity", capacityRoutes);
app.use("/dashboard", konakRoutes);
app.use("/profile", profileRoutes);
app.use("/report", reportRoutes);
app.use("/settings", settingsRoutes);
app.use("/users", usersRoutes);


 app.listen(3000, function(){
    console.log("Server has started");
    }); 