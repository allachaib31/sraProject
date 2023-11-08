const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALTKEY = Number(process.env.SALTKEY);
const JWTKEY = process.env.JWTKEY;
exports.signUp = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, SALTKEY);
        const user = new userModel({
            email: req.body.email,
            password: hashPassword,
            username: req.body.username,
        })
        const result = await user.save();
        console.log('seccess')
        return res.status(200).send('sign up success')
    } catch (err) {
        console.log(err)
        return res.status(500).send('sign up failed')//500-599 is reserved for server errors in HTTP response status codes.
    }
}
exports.logIn = async (req,res) => {
    const { email , password } = req.body;
    try{
        console.log('jkbv');
        const user = await userModel.findOne({
            email: email,
        })
        if(!user){
            return res.status(200).send({
                msg: 'logIn failed'
            });
        } 
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(200).send({
            msg:'logIn failed'
        });
        var token =jwt.sign({ email : email, password : user.password}, JWTKEY);
        return res.status(200).send({
            msg :'logIn success',
            token : token,
        })
    }catch(err){
        return res.status(500).send('logIn failed');
    }
}