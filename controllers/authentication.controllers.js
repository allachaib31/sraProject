// Importation du modèle utilisateur depuis le fichier models/users.js
const userModel = require('../models/users');

// Importation des modules JWT et bcrypt pour la gestion des tokens et des mots de passe
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Récupération des clés SALTKEY et JWTKEY depuis les variables d'environnement
const SALTKEY = Number(process.env.SALTKEY);
const JWTKEY = process.env.JWTKEY;

// Fonction d'inscription (sign up) d'un utilisateur
exports.signUp = async (req, res) => {
    try {
        // Hashage du mot de passe avant de le sauvegarder dans la base de données
        const hashPassword = await bcrypt.hash(req.body.password, SALTKEY);

        // Création d'un nouvel utilisateur avec les informations fournies dans la requête
        const user = new userModel({
            email: req.body.email,
            password: hashPassword,
            username: req.body.username,
        });

        // Sauvegarde de l'utilisateur dans la base de données
        const result = await user.save();

        console.log('Success');
        return res.status(200).send('Sign up success');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Sign up failed'); // Le code HTTP 500-599 est réservé aux erreurs du serveur.
    }
};

// Fonction de connexion (log in) d'un utilisateur
exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Recherche de l'utilisateur dans la base de données par son adresse e-mail
        const user = await userModel.findOne({
            email: email,
        });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
            return res.status(200).send({
                msg: 'Log in failed'
            });
        }

        // Comparaison du mot de passe fourni avec le mot de passe haché stocké dans la base de données
        const match = await bcrypt.compare(password, user.password);

        // Vérification de la correspondance des mots de passe
        if (!match) return res.status(200).send({
            msg: 'Log in failed'
        });

        // Création d'un token JWT avec l'adresse e-mail et le mot de passe de l'utilisateur
        var token = jwt.sign({ email: email, password: user.password }, JWTKEY);

        return res.status(200).send({
            msg: 'Log in success',
            token: token,
        });
    } catch (err) {
        return res.status(500).send('Log in failed');
    }
};
