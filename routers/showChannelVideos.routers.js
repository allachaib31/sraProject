// Importation du module Express
const express = require('express');

// Importation du middleware d'authentification depuis le dossier middleware
const middleware = require('../middleware/authentication.middleware');

// Importation du modèle de données pour les vidéos
const videoModel = require('../models/video');

// Création d'un routeur Express
const router = express.Router();

// Définition de la route

// Route pour afficher les vidéos d'une chaîne spécifique (GET /nom-de-la-route)
router.get('/', async (req, res) => {
    try {
        // Recherche des vidéos associées à une chaîne dans la base de données
        const videos = await videoModel.find({
            idChanel: req.body.idChanel,
        });

        // Retourne les vidéos en cas de succès
        return res.status(200).send(videos);
    } catch (err) {
        // Retourne un message d'erreur en cas d'échec
        return res.status(200).send('Can not show videos of this channel');
    }
});

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
