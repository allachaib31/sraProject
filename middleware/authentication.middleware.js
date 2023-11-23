const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const JWTKEY = process.env.JWTKEY;
exports.authenticationMiddleware = async (req, res, next) => {
    console.log(req.body.token);
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).send('Authentication token missing');
        }
        var decoded = jwt.verify(req.body.token, JWTKEY);
        console.log(decoded);
        const user = await userModel.findOne({
            email: decoded.email
        })
        if (!user) {
            return res.status(200).send('try to login')
        }
        if (user.password != decoded.password) {
            return res.status(200).send('try to login')
        }
        req.body.idUser = user._id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).send('failed')
    }
}