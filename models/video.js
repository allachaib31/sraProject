// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition du schéma pour les vidéos
const videoSchema = new mongoose.Schema({
    // Titre de la vidéo
    title: {
        type: String,
        maxLength: 255,
        required: true,
    },
    // Description de la vidéo
    Descreption: {
        type: String,
        maxLength: 255,
        required: true,
    },
    // Chemin vers la vidéo (doit être unique et obligatoire)
    video: {
        type: String,
        unique: true,
        required: true,
    },
    // ID de la chaîne à laquelle la vidéo appartient
    idChanel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "channels" // Référence au modèle "channels"
    },
    // Nombre de vues de la vidéo (par défaut à 0)
    vues: {
        type: Number,
        default: 0
    },
    // Date de création de la vidéo
    date: {
        type: Date,
    }
});

// Création du modèle de données pour les vidéos
const videoModel = mongoose.model('videos', videoSchema);

// Exportation du modèle pour être utilisé dans d'autres parties de l'application
module.exports = videoModel;
