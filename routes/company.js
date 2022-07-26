const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidation, isAdminRole, validateJWT} = require('../middlewares');

const { createCompany } = require('../controllers/company.controller');
const { ExistsCompanyOnDataBase } = require('../helpers/db-validators');

const router = Router();

//obtener una categoria - público
/* router.get('/:id', [
	check('id', 'El ID es obligatotio').not().isEmpty(),
	check('id', 'No es un ID de Mongo').isMongoId(),
	check('id').custom(ExistsCategoryById),
	fieldValidation
], getCompany); */

//crear una companía - privado - cualquier rol
router.post('/', [
	validateJWT,
	check('name').custom(ExistsCompanyOnDataBase),
	check('name', 'El nombre es obligatotio').not().isEmpty(),
	fieldValidation
], createCompany);

//actualizar una categoria - privado - cualquier rol
/* router.put('/:id', [
	validateJWT,
	check('name', 'El nombre es obligatotio').not().isEmpty(),
	check('id', 'El ID es obligatotio').not().isEmpty(),
	check('id', 'No es un ID de Mongo').isMongoId(),
	check('id').custom(ExistsCompanyById),
	fieldValidation
], updateCompany); */
module.exports = router;