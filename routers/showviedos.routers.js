// Importation du module Express
const express = require('express');

// Importation du contrôleur showVideos depuis le dossier controllers
const showVideos = require('../controllers/showVideos.controllers');

// Importation du middleware d'authentification depuis le dossier middleware
const middleware = require('../middleware/authentication.middleware');

// Création d'un routeur Express
const router = express.Router();

// Définition de la route

// Route pour afficher toutes les vidéos (GET /nom-de-la-route)
router.get('/', showVideos.showVideos);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
