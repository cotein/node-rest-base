const {response} = require('express');
const { ExistItemOnDataBase } = require('../helpers/db-validators');
const {Product} = require('../models');
const Afip = require('@afipsdk/afip.js');

const createProduct = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const existsProduct = await Product.findOne({name});

    ExistItemOnDataBase(existsProduct, res)

    const data = {
        name,
        user : req.authUser._id,
        categories : ['62e194b89bb6ab0577a2bc03', '62e532ce0d5597cee2171f5d'],
        status : true
    }

    const newProduct = new Product(data);

    await newProduct.save();

    res.status(201).json(newProduct);
}

const getAllActiveProducts = async (req, res = response) => {

    const activeProducts = {status : true};

    const {limit = 5, desde = 0} = req.query;

    const [total, products] = await Promise.all([

        Product.countDocuments(activeProducts),

        Product.find(activeProducts)
            .populate('user', 'name')
            .populate('categories', 'name')
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({ total, products });
}

const getProduct = async (req, res = response) => {

    const {id} = req.params;
    console.log(id)
    console.log(id)
    console.log(id)
    const product = await Product.findById(id).populate('categories');
    
    res.json(product);
}

const updateProduct = async (req, res = response) => {

    const {id} = req.params;

    const {status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();

    data.user = req.authUser._id;

    const product = await Product.findByIdAndUpdate(id, data, {new:true});

    res.json(product);
}

module.exports = {
    createProduct,
    getProduct,
    getAllActiveProducts
}