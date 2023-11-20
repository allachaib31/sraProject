const express = require('express');
const router = express.Router();
//const showChannelVideos = require('../controllers/showChannelVideos.controllers')
const middleware =require('../middleware/authentication.middleware'); 
const videoModel = require('../models/video');

router.get('/',async(req,res)=>{
    try {
        const video = await videoModel.find({
            idChanel : req.body.idChanel,
        })
        return res.status(200).send(video);
    }catch(err){
        return res.status(200).send('can not show videos of this channel');
    }
})
module.exports = router;