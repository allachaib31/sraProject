const videoModel = require('../models/video');
const channleModel = require('../models/channel');
exports.consultOtherChannels = async(req,res)=>{
    try {
        const channel = await channleModel.findOne({
            _id:req.query.idChanel,
        });
        console.log(req.query.idChanel);
        console.log(channel);
        if(!channel){
            return res.status(404).send({
                msg:'channel not found'
            });
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
        console.log(err);
        return res.status(200).send('failed to consult channel');
    }
}