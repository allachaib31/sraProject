const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    Name : {
        type : String,
        maxLength : 255,
        required : true,
    },
    photoDeCouvertute : {
        type : String,
    },
    profile : {
        type : String,
    },
    Descreption : {
        type : String,
        maxLength : 255,
    },
    idUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
})
const channleModel = mongoose.model('channels',channelSchema);
module.exports = channleModel;