const express = require('express');
const channleModel = require('../models/channel');
const videoModel = require('../models/video');
const router = express.Router();
const consultOtherChannels = require('../controllers/consultOtherChannels.controllers')
const middleware = require('../middleware/authentication.middleware');
router.get('/',middleware.authenticationMiddleware,consultOtherChannels.consultOtherChannels);
module.exports = router;