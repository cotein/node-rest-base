const {response} = require('express');
const {Category} = require('../models');

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const existsCategory = await Category.findOne({name});

    if ( existsCategory) {
        return res.status(400).json({
            msg : `La categorìa ${existsCategory.name}, ya existe`
        })
    }

    //Crear categoria
    const data = {
        name,
        user : req.authUser._id
    }

    const newCategory = new Category(data);

    await newCategory.save();

    res.status(201).json(newCategory);
}

const getCategories = async (req, res = response) => {

    const activeCategories = {status : true};

    const {limit = 5, desde = 0} = req.query;

    const [total, categories] = await Promise.all([

        Category.countDocuments(activeCategories),

        Category.find(activeCategories)
            .populate('user', 'name') //user es el campo que esta en el modelo category
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({ total, categories });
}

const getCategory = async (req, res = response) => {

    const {id} = req.params;

    const category = await Category.findById(id).populate('user', 'name');
    
    res.json(category);
}

const updateCategory = async (req, res = response) => {

    const {id} = req.params;

    const {status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();

    data.user = req.authUser._id;

    const category = await Category.findByIdAndUpdate(id, data, {new:true});

    res.json(category);
}

const deleteCategory = async (req, res = response) => {

    const {id} = req.params;

    const deletedCategory = await Category.findByIdAndUpdate(id, {status:false}, {new:true});

    res.json(deletedCategory);
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}