// Importation du modèle de données pour les vidéos et les chaînes depuis les fichiers correspondants
const videoModel = require('../models/video');
const channleModel = require('../models/channel');

// Fonction pour consulter les informations d'une chaîne et ses vidéos associées
exports.consultOtherChannels = async (req, res) => {
    try {
        // Recherche de la chaîne par son ID
        const channel = await channleModel.findOne({
            _id: req.query.idChanel,
        });

        // Vérification de l'existence de la chaîne
        if (!channel) {
            return res.status(404).send({
                msg: 'Channel not found'
            });
        }

        // Recherche des vidéos associées à la chaîne
        const videos = await videoModel.find({
            idChanel: channel._id,
        });

        // Retour d'une réponse avec les informations de la chaîne et ses vidéos
        return res.status(200).send({
            msg: 'Channel is found',
            channel: channel,
            videos: videos
        });
    } catch (err) {
        console.log(err);
        return res.status(200).send('Failed to consult channel');
    }
};
