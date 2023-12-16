// Importation du module Express
const express = require('express');

// Importation du module multer pour la gestion des fichiers uploadés
const multer = require('multer');

// Importation du contrôleur uploadVideo depuis le dossier controllers
const uploadVideo = require('../controllers/uploadVideo.controllers');

// Importation du middleware d'authentification depuis le dossier middleware
const middleware = require('../middleware/authentication.middleware');

// Création d'un routeur Express
const router = express.Router();

// Configuration du stockage des fichiers vidéo uploadés avec multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/videos');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Configuration du middleware multer avec les options de stockage
const upload = multer({ storage: storage });

// Définition de la route

// Route pour télécharger une vidéo (POST /nom-de-la-route/uploadVideo)
router.post('/uploadVideo', upload.single('video'), middleware.authenticationMiddleware, uploadVideo.uploadvideo);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
