const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        maxLength : [12,'your username is to long'],
        minlength : [5,'your username is to short'],
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    subscribes : {
        type : Array
    }
})
const userModel = mongoose.model('users',userSchema);
module.exports = userModel;