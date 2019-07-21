const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        max: 25,
        required: true
    },
    accountType: {
        type: String,
        default: 'Alpha',
    },
    department: {
        type: String,
        required: true
    },
    graduation: {
        type: String,
        required: true
    },
    subjects: [
        {
            type: String,
            required: true
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Users", UserSchema);