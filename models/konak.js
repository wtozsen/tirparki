var mongoose = require("mongoose");

var konakSchema = new mongoose.Schema({
    get_cekici: String,
    got_cekici: String,
    dorse: String,
    giris: Date,
    cikis: Date,
    firma: String,
    mal: String,
    aciklama: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        firstName: String,
        lastName: String,
        isAdmin: Boolean
    }
});

module.exports = mongoose.model("Konak", konakSchema);