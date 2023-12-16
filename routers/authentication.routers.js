// Importation du module Express
const express = require('express');

// Création d'un routeur Express
const router = express.Router();

// Importation du contrôleur d'authentification depuis le dossier controllers
const authentication = require('../controllers/authentication.controllers');

// Définition des routes avec les actions associées

// Route pour l'inscription (POST /nom-de-la-route/signUp)
router.post('/signUp', authentication.signUp);

// Route pour la connexion (POST /nom-de-la-route/logIn)
router.post('/logIn', authentication.logIn);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
