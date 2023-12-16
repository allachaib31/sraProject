// Importation du modèle de données pour les vidéos depuis le fichier correspondant
const videoModel = require('../models/video');

// Fonction pour récupérer une vidéo aléatoire
exports.random = async (req, res) => {
    try {
        // Récupération de l'ID de la vidéo depuis la requête
        const videoId = req.body.vidid;

        // Recherche de la vidéo par son ID et population des références aux chaînes et utilisateurs associés
        const video = await videoModel.findById(videoId).populate({
            path: 'idChanel',
            populate: {
                path: 'idUser',
                model: 'users',
                select: 'subscribes'
            }
        });

        // Vérification de l'existence de la vidéo
        if (!video) {
            return res.status(400).send({
                msg: 'Video not found'
            });
        }

        // Calcul d'un nombre aléatoire pour obtenir une vidéo aléatoire parmi les 10 dernières vidéos (ou toutes les vidéos si leur nombre est inférieur à 10)
        const totalVideos = await videoModel.countDocuments();
        const randomValue = Math.floor(Math.random() * (totalVideos > 10 ? totalVideos - 10 : totalVideos));

        console.log(randomValue);

        // Recherche de 10 vidéos aléatoires en sautant le nombre calculé aléatoirement
        const randomVideos = await videoModel.find().populate('idChanel').skip(randomValue).limit(10);

        // Incrémentation du nombre de vues de la vidéo
        video.vues++;
        video.save();

        // Retour d'une réponse avec la vidéo d'origine et les vidéos aléatoires
        return res.status(200).send({
            msg: "Success",
            video: video,
            random: randomVideos
        });
    } catch (err) {
        console.log(err);
        return res.status(200).send({
            msg: 'Error'
        });
    }
};
