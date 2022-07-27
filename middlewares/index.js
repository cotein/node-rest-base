const validateJWT = require('../middlewares/validateJWT.middleware');
const fieldValidation = require('../middlewares/validation.middleware');
const validateRoles = require('../middlewares/validate-role.middleware');

module.exports = {
    ...validateJWT,
    ...fieldValidation,
    ...validateRoles
}