const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const usersGet = (req, res = response) => {

    const {page, limit, q} = req.query;
    res.json({
        msg : "get API - Controller",
        page, limit, q
    });
}

const usersPost = async (req, res = response) => {

    const body = req.body;
    const user = new User(body);
    //verificar si ya esta persisitido el email

    //ecnriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(body.password, salt);
    await user.save();

    res.json({
        user,
    });
}

const usersPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg : "put API - Controller",
        'id' : id
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg : "delete API - Controller"
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}