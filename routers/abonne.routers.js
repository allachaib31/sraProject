const express = require('express');
const middleware = require('../middleware/authentication.middleware');
const router = express.Router();
const abonne = require('../controllers/abonne.controllers')

router.post('/',middleware.authenticationMiddleware,abonne.abonne);
router.post('/desabonne',middleware.authenticationMiddleware,abonne.desabonne);
module.exports = router;