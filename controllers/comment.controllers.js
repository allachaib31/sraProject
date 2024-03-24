const videoModel = require("../models/video");

exports.comment = async(req,res)=>{
    const video = await videoModel.findById(req.body.vidid);
    try{
        if (!video.comment) {
            video.comment = new Map();
        }
        const newComment ={
            text: req.body.comment,
            oauth: req.body.idUser,
        }
        video.comment.set(String(video.comment.size),newComment);
        await video.save();
        return res.status(200).send({
            status: true,
            msg: "succed"
        })
    }catch(err){
        console.log(err)
        return res.status(200).send({
            status: false,
            msg: "try again"
        })
    }
}