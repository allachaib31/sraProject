const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication.controllers');
router.post('/signUp',authentication.signUp);
router.post('/logIn',authentication.logIn);
module.exports = router; 