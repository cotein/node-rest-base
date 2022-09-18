const { response } = require('express');
const { ExistCompanyOnDataBase } = require('../helpers/db-validators');
const { Company } = require('../models');
const Inscription = require('../models/Inscription');

const createCompany = async (req, res = response) => {

	const name = req.body.name.toUpperCase();
	const cuit = req.body.cuit;
	const inscription = await Inscription.findOne({ name });
	const existsCompany = await Company.findOne({ cuit });

	ExistCompanyOnDataBase(existsCompany, res);

	const data = {
		name,
		cuit,
		inscription,
		user: req.authUser._id,
		status: true
	};

	const newCompany = new Company(data);

	await newCompany.save();

	res.status(201).json(newCompany);
};


const getCompany = async (req, res = response) => {

	const { id } = req.params;
	const company = await Company.findById(id);

	res.json(company);
};

const updateCompany = async (req, res = response) => {

	const { id } = req.params;

	// eslint-disable-next-line no-unused-vars
	const { status, user, ...data } = req.body;

	data.name = data.name.toUpperCase();

	data.user = req.authUser._id;

	const company = await Company.findByIdAndUpdate(id, data, { new: true });

	res.json(company);
};

module.exports = {
	createCompany,
	getCompany,
	updateCompany
};