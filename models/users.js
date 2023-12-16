// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition du schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
    // Nom d'utilisateur
    username: {
        type: String,
        maxLength: [12, 'Your username is too long'],
        minlength: [5, 'Your username is too short'],
        unique: true,
    },
    // Adresse e-mail de l'utilisateur (doit être unique et obligatoire)
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Mot de passe de l'utilisateur (doit être obligatoire)
    password: {
        type: String,
        required: true,
    },
    // Tableau des abonnements de l'utilisateur
    subscribes: {
        type: Array,
    }
});

// Création du modèle de données pour les utilisateurs
const userModel = mongoose.model('users', userSchema);

// Exportation du modèle pour être utilisé dans d'autres parties de l'application
module.exports = userModel;
