const express = require('express');
const router = express.Router();
const showVideos = require('../controllers/showVideos.controllers')
const middleware =require('../middleware/authentication.middleware'); 
router.get('/showVideos',middleware.authenticationMiddleware,showVideos.showVideos)

module.exports = router;