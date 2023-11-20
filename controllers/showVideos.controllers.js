const videoModel = require('../models/video')

exports.showVideos = async(req,res)=>{
    try {
        const lastesVideos = await videoModel.find().sort({date : 1}).limit(20);
        return res.status(200).send(lastesVideos);
    }catch(err){
        return res.status(200).send('impossible to show videos');
    }
}