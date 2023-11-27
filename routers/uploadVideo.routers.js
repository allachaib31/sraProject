const express = require('express')
const router = express.Router();
const multer = require('multer');
const uploadVideo = require('../controllers/uploadVideo.controllers')
const middleware =require('../middleware/authentication.middleware'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/videos')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
router.post('/uploadVideo',upload.single('video'),middleware.authenticationMiddleware,uploadVideo.uploadvideo);


module.exports = router;