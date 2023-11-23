const userModel = require('../models/users')
exports.abonne = async(req,res)=>{
    try {
        const user = await userModel.findById(req.body.idUser)
        for(let i=0;i<user.subscribes.length;i++){
            if(user.subscribes[i]==req.body.idChannel){
                return res.status(200).send({
                    msg : "already subscribe"
                })
            }
        }
        user.subscribes.push(req.body.idChannel)
        await user.save()
        return res.status(200).send({
            msg : true
        })
    }catch(err){
        console.log(err)
        return res.status(200).send('err')
    }
}


