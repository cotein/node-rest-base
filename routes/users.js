const {Router} = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/validation.middleware');

const router = Router();

const {usersGet,
    usersPost,
    usersPut,
    usersDelete} = require('../controllers/users.controller');


router.get('/',  usersGet)

router.post('/', [
    check('name', "El nombre es requerido").not().isEmpty(),
    check('email', "Email no válido").isEmail(),
    fieldValidation
], usersPost)

router.put('/:id',  usersPut)

router.delete('/',  usersDelete)

module.exports = router;