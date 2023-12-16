// Importation du module Express
const express = require('express');

// Importation du contrôleur random depuis le dossier controllers
const random = require('../controllers/showvidbyid&random.controllers');

// Importation du middleware d'authentification depuis le dossier middleware
const middleware = require('../middleware/authentication.middleware');

// Création d'un routeur Express
const router = express.Router();

// Définition de la route

// Route pour afficher une vidéo aléatoire (POST /nom-de-la-route)
router.post('/', middleware.authenticationMiddleware, random.random);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
