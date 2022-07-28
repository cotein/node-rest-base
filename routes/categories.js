const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidation, isAdminRole, validateJWT} = require('../middlewares');
const {ExistsCategoryById} = require('../helpers/db-validators');
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller');

const router = Router();

//obtener todas las categorias - público
router.get('/', getCategories)

//obtener una categoria - público
router.get('/:id', [
    check('id', "El ID es obligatotio").not().isEmpty(),
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom(ExistsCategoryById),
    fieldValidation
], getCategory);

//crear una categoria - privado - cualquier rol
router.post('/', [
    validateJWT,
    check('id').custom(ExistsCategoryById),
    check('name', "El nombre es obligatotio").not().isEmpty(),
    fieldValidation
], createCategory);

//actualizar una categoria - privado - cualquier rol
router.put('/:id', [
    validateJWT,
    check('name', "El nombre es obligatotio").not().isEmpty(),
    check('id', "El ID es obligatotio").not().isEmpty(),
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom(ExistsCategoryById),
    fieldValidation
], updateCategory)

//borrar una categoria - privado - admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', "El ID es obligatotio").not().isEmpty(),
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom(ExistsCategoryById),
    fieldValidation
],deleteCategory)



module.exports = router;