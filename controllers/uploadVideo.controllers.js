// Importation des modèles de données pour les chaînes et les vidéos depuis les fichiers correspondants
const channleModel = require('../models/channel');
const videoModel = require('../models/video');

// Fonction pour télécharger une vidéo
exports.uploadvideo = async (req, res) => {
    try {
        // Recherche de la chaîne associée à l'utilisateur
        const channel = await channleModel.findOne({
            idUser: req.body.idUser,
        });

        // Vérification de l'existence de la chaîne
        if (!channel) {
            return res.status(200).send('Create a channel first');
        }

        // Création d'une nouvelle vidéo avec les données fournies
        const video = new videoModel({
            title: req.body.title,
            Descreption: req.body.Descreption,
            video: 'uploads/videos/' + req.file.filename,
            idChanel: channel._id,
            date: new Date(),
        });

        // Sauvegarde de la vidéo dans la base de données
        await video.save();

        // Retour d'une réponse indiquant que la vidéo a été sauvegardée
        return res.status(200).send('Video saved');
    } catch (err) {
        console.log(err);
        return res.status(200).send('Video not saved');
    }
};
