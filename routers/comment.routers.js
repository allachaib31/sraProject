const express = require("express");
const router = express.Router();
// Importation du middleware d'authentification depuis le dossier middleware
const middleware = require('../middleware/authentication.middleware');

const {comment} = require('../controllers/comment.controllers');
router.post("/",middleware.authenticationMiddleware,comment)

module.exports = router;