const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    title :{
        type : String,
        maxLength : 255,
        required : true,

    },
    Descreption :{
        type : String,
        maxLength : 255,
        required : true,
    },
    video : {
        type : String,
        unique : true,
        required : true,
    },
    idChanel :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"channels"
    },
    vues: {
        type: Number,
        default: 0
    },
    date : {
        type : Date,
    }
})
const videoModel = mongoose.model('videos',videoSchema);
module.exports = videoModel;