const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidation, validateJWT} = require('../middlewares');

const { createProduct, getProduct, getAllActiveProducts } = require('../controllers/product.controller');
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
	check('id').custom( ExistsProductById ),
	fieldValidation
], getProduct);

module.exports = router;