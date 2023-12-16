// Importation du module Express
const express = require('express');

// Importation du middleware d'authentification depuis le dossier middleware
const middleware = require('../middleware/authentication.middleware');

// Création d'un routeur Express
const router = express.Router();

// Importation du contrôleur abonne depuis le dossier controllers
const abonne = require('../controllers/abonne.controllers');

// Définition des routes avec les actions associées

// Route pour s'abonner (POST /nom-de-la-route)
router.post('/', middleware.authenticationMiddleware, abonne.abonne);

// Route pour se désabonner (POST /nom-de-la-route/desabonne)
router.post('/desabonne', middleware.authenticationMiddleware, abonne.desabonne);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
