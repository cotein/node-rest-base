const { Router } = require('express');
const { check } = require('express-validator');
const { getMeliToken } = require('../controllers/meli.controller');
const { fieldValidation } = require('../middlewares');

const router = Router();

router.post('/', fieldValidation, getMeliToken);

module.exports = router;