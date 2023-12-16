// Importation du module Express
const express = require('express');

// Importation des modèles de données pour les chaînes (channels) et les vidéos
const channleModel = require('../models/channel');
const videoModel = require('../models/video');

// Création d'un routeur Express
const router = express.Router();

// Importation du contrôleur consultOtherChannels depuis le dossier controllers
const consultOtherChannels = require('../controllers/consultOtherChannels.controllers');

// Importation du middleware d'authentification depuis le dossier middleware
const middleware = require('../middleware/authentication.middleware');

// Définition de la route

// Route pour consulter les chaînes d'autres utilisateurs (GET /nom-de-la-route)
router.get('/', middleware.authenticationMiddleware, consultOtherChannels.consultOtherChannels);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
