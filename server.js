require('custom-env').env('dev');
const express = require('express');
const mongoose = require('mongoose');
const multer =require('multer');
const creatchannel = require('./routers/creatchannel.routers')
const authentication = require('./routers/authentication.routers');
const uploadVideo = require('./routers/uploadVideo.routers');
const morgan = require('morgan');
const MONGODBURL = process.env.MONGODBURL;
mongoose.connect(MONGODBURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongodb connected');
}).catch((err)=>{
    console.log(err);
})
const app = express();
app.use(express.static('views'))
    .use(express.static('public'))
    .use(express.json())
    .use(morgan('tiny'))
    .use('/authentication/',authentication)
    .use('/upload/',uploadVideo)
    .use('/channel/',creatchannel)
app.get('/',(req,res)=>{
    return res.status(200).sendFile(__dirname + '/index.html')
})
const PORT = process.env.PORT || 5000;
const URL = process.env.URL;
const server = app.listen(PORT,()=>{
    console.log("Server is up and start listening on port :" + PORT + ' ' + URL);
})