const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidation } = require('../middlewares/validation.middleware');
const {login, googleSignIn} = require('../controllers/auth.controller');
const { validateJWT } = require('../middlewares/validateJWT.middleware');

const router = Router();

//obtener todas las categorias - público
router.get('/', (req, res) => {
    res.json('get')
})

//obtener una categoria - público
router.get('/:id', (req, res) => {
    res.json('get - id')
})

//crear una categoria - privado - cualquier rol
router.post('/', [validateJWT], (req, res) => {
    res.json('post')
})

//actualizar una categoria - privado - cualquier rol
router.put('/:id', (req, res) => {
    res.json('put')
})

//borrar una categoria - privado - admin
router.delete('/:id', (req, res) => {
    res.json('delete')
})



module.exports = router;