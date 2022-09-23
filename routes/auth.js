const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidation } = require('../middlewares/validation.middleware');
const {login, googleSignIn, register, confirm} = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
	check('email', 'Email no válido').isEmail(),
	check('password', 'La contraseña es obligatoria').not().isEmpty(),
	fieldValidation
], login);

router.post('/google', [
	check('id_token', 'Token de Google es necesario').not().isEmpty(),
	fieldValidation,
	googleSignIn
], login);

router.post('/register', [
	check('userForm', 'Los datos del usuario son necesarios').not().isEmpty(),
	fieldValidation,
], register);

router.get('/confirm/:token',
    [],
    confirm
);

module.exports = router;