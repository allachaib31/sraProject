const express = require('express');
const router = express.Router();
const multer = require('multer');
const middleware =require('../middleware/authentication.middleware'); 
const creatchannel = require('../controllers/creatChannel.controllers')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if (file.fieldname === 'imageProfile') {
          cb(null, './uploads/profileImages');
        } else if (file.fieldname === 'imageCover') {
          cb(null, './uploads/coverImages');
        }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })
router.post('/creatchannel',upload.fields([
  { name: 'imageProfile', maxCount: 1 },
  { name: 'imageCover', maxCount: 1 }
]),middleware.authenticationMiddleware,creatchannel.creatchannel
)
router.post('/getchannel',middleware.authenticationMiddleware,creatchannel.getchanneluser)

module.exports = router;
