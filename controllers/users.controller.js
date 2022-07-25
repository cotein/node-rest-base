const {response} = require('express');

const usersGet = (req, res = response) => {

    const {page, limit, q} = req.query;
    res.json({
        msg : "get API - Controller",
        page, limit, q
    });
}

const usersPost = (req, res = response) => {

    const {nombre, id} = req.body;

    res.json({
        msg : "post API - Controller",
        nombre,
        id
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