// Importation du modèle utilisateur depuis le fichier models/users.js
const userModel = require('../models/users');

// Fonction pour s'abonner à une chaîne
exports.abonne = async (req, res) => {
    try {
        // Recherche de l'utilisateur par son ID
        const user = await userModel.findById(req.body.idUser);

        // Vérification si l'utilisateur est déjà abonné à la chaîne
        for (let i = 0; i < user.subscribes.length; i++) {
            if (user.subscribes[i] == req.body.idChannel) {
                return res.status(200).send({
                    msg: "Already subscribed"
                });
            }
        }

        // Ajout de l'ID de la chaîne aux abonnements de l'utilisateur
        user.subscribes.push(req.body.idChannel);

        // Sauvegarde des modifications dans la base de données
        await user.save();

        return res.status(200).send({
            msg: true
        });
    } catch (err) {
        console.log(err);
        return res.status(200).send('Error');
    }
};

// Fonction pour se désabonner d'une chaîne
exports.desabonne = async (req, res) => {
    try {
        // Recherche de l'utilisateur par son ID
        const user = await userModel.findById(req.body.idUser);

        // Recherche de l'index de la chaîne dans les abonnements de l'utilisateur
        const channelIndex = user.subscribes.indexOf(req.body.idChannel);

        // Vérification si l'utilisateur est abonné à la chaîne avant de la désabonner
        if (channelIndex > -1) {
            user.subscribes.splice(channelIndex, 1);
            await user.save();
        }

        console.log(channelIndex);

        return res.status(200).send({
            msg: 'Unsubscribed'
        });
    } catch (err) {
        return res.status(200).send('Error');
    }
};


