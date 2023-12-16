// Importation du modèle de données pour les vidéos depuis le fichier correspondant
const videoModel = require('../models/video');

// Fonction pour afficher les vidéos les plus récentes
exports.showVideos = async (req, res) => {
    try {
        // Recherche des dernières vidéos, triées par date dans l'ordre croissant, limitées à 20 vidéos et avec population de la référence à la chaîne
        const latestVideos = await videoModel.find().sort({ date: -1 }).populate("idChanel").limit(20);

        // Retour d'une réponse avec les vidéos les plus récentes
        return res.status(200).send(latestVideos);
    } catch (err) {
        console.log(err);
        return res.status(200).send('Impossible to show videos');
    }
};
