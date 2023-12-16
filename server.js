// Configuration pour charger les variables d'environnement du fichier '.env' en mode développement
require('custom-env').env('dev');

// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const morgan = require('morgan');

// Importation des routes définies dans des fichiers séparés
const search = require('./routers/search.routers');
const creatchannel = require('./routers/creatchannel.routers');
const authentication = require('./routers/authentication.routers');
const uploadVideo = require('./routers/uploadVideo.routers');
const showVideos = require('./routers/showviedos.routers');
const showChannelVideos = require('./routers/showChannelVideos.routers');
const abonne = require('./routers/abonne.routers');
const consultOtherChannels = require('./routers/consultOtherChannels.routers');
const random = require('./routers/showvidbuid&random.routers');

// Configuration de l'URL de la base de données MongoDB à partir des variables d'environnement
const MONGODBURL = process.env.MONGODBURL;

// Connexion à la base de données MongoDB
mongoose.connect(MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongodb connected');
}).catch((err) => {
    console.log(err);
});

// Création de l'application Express
const app = express();

// Configuration des middlewares
app.use(express.static('views'))
    .use(express.static('public'))
    .use(express.json())
    .use(morgan('tiny'))
    .use('/authentication/', authentication)
    .use('/upload/', uploadVideo)
    .use('/channel/', creatchannel)
    .use('/showVideos/', showVideos)
    .use('/showChannelVideos/', showChannelVideos)
    .use('/search/', search)
    .use('/abonne/', abonne)
    .use('/random/', random)
    .use('/consultOtherChannels/', consultOtherChannels);

// Route pour la page d'accueil
app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/index.html');
});

// Configuration du port et de l'URL à partir des variables d'environnement
const PORT = process.env.PORT || 5000;
const URL = process.env.URL;

// Démarrage du serveur
const server = app.listen(PORT, () => {
    console.log("Server is up and start listening on port :" + PORT + ' ' + URL);
});
