var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {type:Boolean, default: false},
    firstName: String,
    lastName: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);