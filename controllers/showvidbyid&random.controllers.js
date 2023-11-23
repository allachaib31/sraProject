const videoModel = require('../models/video');

exports.random = async(req,res)=>{
    try {
        console.log(req.query)
        const video = await videoModel.findById(req.query.vidid)
        if (!video) {
            return res.status(400).send({ 
                msg: 'Video not found'
             });
          }
          const number = await videoModel.find()
          const randomval = Math.floor(Math.random() * (number.length>10 ?number.length-10 : number.length));
          console.log(randomval)
        const random = await videoModel.find().skip(randomval).limit(10);
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