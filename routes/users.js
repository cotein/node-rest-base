/* eslint-disable indent */
const {Router} = require('express');
const { check } = require('express-validator');
const {
    fieldValidation,
    validateJWT,
    isAdminRole,
    hasRole
} = require('../middlewares');

const {ValidRole, ExistsEmail, ExistsUserById} = require('../helpers/db-validators');

const router = Router();

const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
} = require('../controllers/users.controller');


router.get('/',  usersGet);

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Email no válido').isEmail(),
    check('email').custom(email => ExistsEmail(email)),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    //check('password', "El password debe contener un mínimo de 6 letras").isLength({min:6}),
    //check('role', "Noes permitido").isIn(['ADMIN', 'VENTAS']),
    check('role').custom( rol => ValidRole(rol) ),
    fieldValidation
], usersPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(id => ExistsUserById(id)),
    check('role').custom( rol => ValidRole(rol) ),
    fieldValidation
],  usersPut);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    //hasRole('USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(id => ExistsUserById(id)),
    fieldValidation
],
 usersDelete);

module.exports = router;