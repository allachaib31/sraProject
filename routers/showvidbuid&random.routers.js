const express = require('express');
const random = require('../controllers/showvidbyid&random.controllers')
const router = express.Router();
const middleware = require('../middleware/authentication.middleware')

router.post('/',middleware.authenticationMiddleware,random.random)
module.exports = router;