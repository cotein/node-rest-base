const jwt = require('jsonwebtoken');
const { request, response } = require("express")
const User = require('../models/User');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    console.log(token);

    if (! token) {
        return res.status(401).json({
            msg : 'No esta autenticado'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        //leer usuario que corresponde al uid
        const authUser = await User.findById(uid);
        
        if (!authUser) {
            return res.status(401).json({
                msg : 'Token no válido - Usuario no existe'
            })
        }

        //Verificar si el uid (usuario) tiene estado true
        if (!authUser.status) {
            return res.status(401).json({
                msg : 'Token no válido - Usuario con status false'
            })
        }

        req.authUser = authUser;
        //req.uid = uid;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg : 'Token no válido'
        })
    }
}

module.exports = {
    validateJWT
}