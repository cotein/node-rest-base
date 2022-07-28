const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidation, isAdminRole, validateJWT} = require('../middlewares');
const {ExistsCategoryById} = require('../helpers/db-validators');
const { response } = require('express');
const Afip = require('@afipsdk/afip.js');

const router = Router();

//obtener todas las categorias - público
router.get('/', async (req, res = response)=>{
    const afip = new Afip({ CUIT: 23263268709, production : true });
    
    //const taxpayerDetails = await afip.RegisterScopeFive.getTaxpayerDetails(20227339730)
    const taxpayerDetails = await afip.getServerStatus();
    console.log(taxpayerDetails);
    res.json('wwwwwwwwwwwww')
});

module.exports = router;