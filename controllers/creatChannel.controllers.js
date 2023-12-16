// Importation des modèles de données pour les chaînes et les vidéos depuis les fichiers correspondants
const channleModel = require('../models/channel');
const videoModel = require('../models/video');

// Fonction pour créer une nouvelle chaîne
exports.creatchannel = async (req, res) => {
    try {
        // Récupération des données de la requête
        const { Name, Description, idUser } = req.body;

        // Récupération des fichiers d'image de profil et de couverture depuis la requête
        const profileFile = req.files['imageProfile'][0];
        const coverFile = req.files['imageCover'][0];

        // Récupération des chemins des fichiers d'image
        const profilePath = profileFile.path;
        const coverPath = coverFile.path;
        // Création d'une nouvelle chaîne avec les données fournies
        const channel = new channleModel({
            Name: Name,
            Description: Description,
            photoDeCouverture: coverPath,
            profile: profilePath,
            idUser: idUser
        });

        // Sauvegarde de la chaîne dans la base de données
        const savechannel = await channel.save();

        return res.status(200).send("Channel created successfully");
    } catch (err) {
        console.log(err);
        return res.status(200).send("Failed to create channel");
    }
};

// Fonction pour récupérer les informations d'une chaîne appartenant à un utilisateur
exports.getchanneluser = async (req, res) => {
    try {
        // Récupération de l'ID de l'utilisateur depuis la requête
        const userId = req.body.idUser;

        // Recherche de la chaîne associée à l'utilisateur dans la base de données et population de l'objet "idUser"
        const channel = await channleModel.findOne({
            idUser: userId,
        }).populate("idUser");

        // Vérification de l'existence de la chaîne
        if (!channel) {
            return res.status(200).send({
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
        return res.status(200).send('Error');
    }
};

 