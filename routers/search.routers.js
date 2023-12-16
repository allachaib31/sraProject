// Importation du module Express
const express = require('express');

// Importation du contrôleur search depuis le dossier controllers
const search = require('../controllers/search.controllers');

// Création d'un routeur Express
const router = express.Router();

// Définition de la route

// Route pour la recherche (GET /nom-de-la-route)
router.get('/', search.search);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
