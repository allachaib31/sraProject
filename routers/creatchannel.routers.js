// Importation du module Express
const express = require('express');

// Importation du module multer pour la gestion des fichiers uploadés
const multer = require('multer');

// Importation du middleware d'authentification depuis le dossier middleware
const middleware = require('../middleware/authentication.middleware');

// Importation du contrôleur creatchannel depuis le dossier controllers
const creatchannel = require('../controllers/creatChannel.controllers');

// Configuration du stockage des fichiers uploadés avec multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if (file.fieldname === 'imageProfile') {
          cb(null, './public/uploads/profileImages');
        } else if (file.fieldname === 'imageCover') {
          cb(null, './public/uploads/coverImages');
        }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

// Configuration du middleware multer avec les options de stockage
const upload = multer({ storage: storage });

// Création d'un routeur Express
const router = express.Router();

// Définition des routes

// Route pour la création de chaîne (POST /nom-de-la-route/creatchannel)
router.post('/creatchannel', upload.fields([
  { name: 'imageProfile', maxCount: 1 },
  { name: 'imageCover', maxCount: 1 }
]), middleware.authenticationMiddleware, creatchannel.creatchannel);

// Route pour récupérer les informations de la chaîne de l'utilisateur (POST /nom-de-la-route/getchannel)
router.post('/getchannel', middleware.authenticationMiddleware, creatchannel.getchanneluser);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;

