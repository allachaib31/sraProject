// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition du schéma pour les chaînes
const channelSchema = new mongoose.Schema({
    // Nom de la chaîne
    Name: {
        type: String,
        maxLength: 255,
        required: true,
    },
    // Chemin vers la photo de couverture de la chaîne
    photoDeCouverture: {
        type: String,
    },
    // Chemin vers la photo de profil de la chaîne
    profile: {
        type: String,
    },
    // Description de la chaîne
    Description: {
        type: String,
        maxLength: 255,
    },
    // ID de l'utilisateur associé à la chaîne
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users" // Référence au modèle "users"
    }
});

// Création du modèle de données pour les chaînes
const channelModel = mongoose.model('channels', channelSchema);

// Exportation du modèle pour être utilisé dans d'autres parties de l'application
module.exports = channelModel;
