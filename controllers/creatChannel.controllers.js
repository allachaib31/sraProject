const channleModel = require('../models/channel');

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

 