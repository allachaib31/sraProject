const channleModel = require('../models/channel')

exports.search = async(req,res)=>{
    try {
        const query = req.query.vid;
        const channel = await channleModel.find({
            Descreption : {
                $regex : /alaa/
            }
        })
        console.log(channel)
        return res.status(200).send(channel)
    }catch(err){
        return res.status(200).send('err')
    }
}
