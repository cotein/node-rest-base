const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidation, validateJWT} = require('../middlewares');

const { createProduct, getProduct, getAllActiveProducts, updateProduct } = require('../controllers/product.controller');
const { ExistsProductById } = require('../helpers/db-validators');

const router = Router();

//obtener todos las productos - público
router.get('/', getAllActiveProducts);

//crear un producto - privado
router.post('/', [
	validateJWT,
	check('name', 'El campo nombre es obligatorio').not().isEmpty(),
	fieldValidation
], createProduct);

//obtener un producto - pùblico
router.get('/:id', [
	check('id', 'El ID es obligatotio').not().isEmpty(),
	check('id', 'No es un ID de Mongo').isMongoId(),
	fieldValidation
], getProduct);

//Actualizar producto - privado
router.put('/:id', [
	validateJWT,
	check('name', 'El nombre es obligatotio').not().isEmpty(),
	check('id', 'El ID es obligatotio').not().isEmpty(),
	check('id', 'No es un ID de Mongo').isMongoId(),
	fieldValidation
], updateProduct);
module.exports = router;