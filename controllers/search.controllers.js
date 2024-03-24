// Importation du modèle de données pour les chaînes depuis le fichier correspondant
const videoModel = require('../models/video');

// Fonction de recherche de chaînes
exports.search = async (req, res) => {
    try {
        const query = req.query.search;
        const channel = await videoModel.find({
            title : {
                $regex : new RegExp(query, 'gi')
            }
        }).populate("idChanel")
        console.log(query)
        return res.status(200).send(channel)
    }catch(err){
        return res.status(200).send('err')
    }
};
