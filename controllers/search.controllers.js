// Importation du modèle de données pour les chaînes depuis le fichier correspondant
const channleModel = require('../models/channel');

// Fonction de recherche de chaînes
exports.search = async (req, res) => {
    try {
        // Récupération du terme de recherche depuis la requête
        const query = req.query.vid;

        // Utilisation de la méthode find avec une expression régulière pour rechercher les chaînes par description
        const channels = await channleModel.find({
            Descreption: {
                $regex: new RegExp(query, 'i') // 'i' pour effectuer une recherche insensible à la casse
            }
        });

        console.log(channels);

        // Retour d'une réponse avec les chaînes trouvées
        return res.status(200).send(channels);
    } catch (err) {
        console.log(err);
        return res.status(200).send('Error');
    }
};
