const channleModel = require('../models/channel');
const videoModel = require('../models/video');
exports.creatchannel = async(req,res)=>{
    try {
        const { Name, Description,idUser } = req.body;
        const profileFile = req.files['imageProfile'][0];
        const coverFile = req.files['imageCover'][0];
        const profilePath = profileFile.path;
        const coverPath = coverFile.path;
        const channel = new channleModel({
            Name : Name,
            Descreption : Description,
            photoDeCouvertute: coverPath,
            profile: profilePath,
            idUser : idUser
        })
        const savechannel = await channel.save();
        return res.status(200).send("channel created seccessfully")
    }catch(err){
      console.log(err);
        return res.status(200).send("failed to creat channel");
    }
}
exports.getchanneluser =async(req,res)=>{

    try {
      console.log(req.body.idUser)
      const channel = await channleModel.findOne({
        idUser : req.body.idUser,
      })
      if(!channel){
        return res.status(200).send({
          msg :'channel not found'
        })
      }
      const videos = await videoModel.find({
        idChanel : channel._id,
      })
      return res.status(200).send({
        msg : 'channel is found',
        channel : channel,
        videos : videos
      })
    }catch(err){
      console.log('err')
    }
}

 