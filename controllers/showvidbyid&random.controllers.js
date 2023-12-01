const videoModel = require('../models/video');

exports.random = async(req,res)=>{
    try {
        console.log(req.body)
        const video = await videoModel.findById(req.body.vidid).populate({
            path: 'idChanel',
            populate: {
                path: 'idUser',
                model: 'users',
                select: 'subscribes'
            }
        });
        if (!video) {
            return res.status(400).send({ 
                msg: 'Video not found'
             });
          }
          const number = await videoModel.find()
          const randomval = Math.floor(Math.random() * (number.length>10 ?number.length-10 : number.length));
          console.log(randomval)
        const random = await videoModel.find().populate('idChanel').skip(randomval).limit(10);
        video.vues++;
        video.save();
        return res.status(200).send({
            msg : "success",
            video : video,
            random : random
          });
    }catch(err){
        console.log(err)
        return res.status(200).send({
            msg : 'erreur'
        })
    }
}