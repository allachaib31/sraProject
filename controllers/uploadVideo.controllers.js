const channleModel =require('../models/channel')
const videoModel = require('../models/video')

exports.uploadvideo = async(req,res)=>{
    try{
        const channel = await channleModel.findOne({
          idUser : req.body.idUser,
        })
        if(!channel){
          return res.status(200).send('creat channel first');
        }
        const video = new videoModel({
            title: req.body.title,
            Descreption: req.body.Descreption,
            video : 'uploads/videos/'+req.file.filename,
            idChanel: channel._id,
            date : new Date(),
        })
        await video.save();
        return res.status(200).send('video saved')
    }catch(err){
        console.log("err");
        return res.status(200).send('video unsaved')
    }
}