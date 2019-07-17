const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Users", UserSchema);