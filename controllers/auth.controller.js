const bcryptjs = require("bcryptjs");
const { response } = require("express");

const {User} = require('../models');
const {generateJWT} = require('../helpers/generate-jwt');
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const {email, password} = req.body;

    //verificar si el mail existe
    const user = await User.findOne({email});

    if (! user) {
        return res.status(400).json({
            msg : "Usuario / pass incorrectos - correo"
        })
    }
    
    //si el usuario esta activo
    if (! user.status) {
        return res.status(400).json({
            msg : "Usuario / pass incorrectos - status false"
        })
    }
    
    //verificar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (! validPassword) {
        return res.status(400).json({
            msg : "Usuario / pass incorrectos - password"
        })
    }

    //generar jwt
    const token = await generateJWT(user.id);
    res.json({user, token})
}

const googleSignIn = async (req, res = response) => {

    const {id_token} = req.body;

    try {
        
        const {name, email, img} = await googleVerify(id_token);

        let user = await User.findOne({email});

        if (! user) {
            //creo usuario
            const data = {
                name,
                email,
                password : ':p',
                img,
                role : "ADMIN_ROLE",
                google : true
            }

            user = new User(data);
            await user.save(); 
        }

        if (! user.status) {
            res.status(401).json({
                msg : 'Hable con el administrador, Usuario bloqueado'
            })
        }

        const token = await generateJWT(user.id);

        res.json({user, token})
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok : false,
            msg : 'No se pudo autenticar con google'
        })
    }
}

module.exports = {
    login,
    googleSignIn
};