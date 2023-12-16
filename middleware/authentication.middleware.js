const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const JWTKEY = process.env.JWTKEY;

// Middleware d'authentification
exports.authenticationMiddleware = async (req, res, next) => {
    try {
        // Récupération du token depuis le corps de la requête
        const token = req.body.token;

        // Vérification de la présence du token
        if (!token) {
            return res.status(401).send('Authentication token missing');
        }

        // Vérification et décodage du token
        const decoded = jwt.verify(token, JWTKEY);

        // Recherche de l'utilisateur associé au token décodé
        const user = await userModel.findOne({
            email: decoded.email
        });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
            return res.status(200).send('Try to login');
        }

        // Vérification du mot de passe dans le token avec celui de l'utilisateur
        if (user.password !== decoded.password) {
            return res.status(200).send('Try to login');
        }

        // Ajout de l'ID de l'utilisateur à la requête pour une utilisation ultérieure
        req.body.idUser = user._id;

        // Poursuite de l'exécution du middleware
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).send('Failed authentication');
    }
};
