const express = require('express')
const search = require('../controllers/search.controllers')
const router = express.Router();

router.get('/',search.search)

module.exports = router;