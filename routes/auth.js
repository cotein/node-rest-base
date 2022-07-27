const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidation } = require('../middlewares/validation.middleware');
const {login, googleSignIn} = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', "Email no válido").isEmail(),
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    fieldValidation
], login)

router.post('/google', [
    check('id_token', "Token de Google es necesario").not().isEmpty(),
    fieldValidation,
    googleSignIn
], login)

module.exports = router;