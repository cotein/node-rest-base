const { Role, Category, Product, Company } = require('../models');
const { User } = require('../models');
const response = require('express');

const ValidRole = async (role = '') => {
	const existsRol = await Role.findOne({ role });
	if (!existsRol) {
		throw new Error(`El rol ${role} no existe en la base de datos`);
	}
};

const ExistsEmail = async (email = '') => {
	const existsEmail = await User.findOne({ email });
	if (existsEmail) {
		throw new Error(`El email ${email} ya existe en la base de datos`);
	}
};

const ExistsUserById = async (id = '') => {
	const existsUserById = await User.findById(id);
	if (!existsUserById) {
		throw new Error(`No existe Usuario con el ID, ${id}`);
	}
};

const ExistsCategoryById = async (id = '') => {
	const existsCategoryById = await Category.findById(id);
	if (!existsCategoryById) {
		throw new Error(`No existe Categorìa con el ID, ${id}`);
	}
};

const ExistsProductById = async (id = '') => {
	const existsProductById = await Product.findById(id);
	if (existsProductById) {
		throw new Error(`Ya existe un Producto con el ID, ${id}`);
	}
};

const ExistsCompanyOnDataBase = async (comapny) => {
	const company = await Company.findOne({ name: comapny.name });
	if (company) {
		throw new Error(`Ya existe esta compañia en nuestros registros`);
	}
};

module.exports = {
	ValidRole,
	ExistsEmail,
	ExistsUserById,
	ExistsCategoryById,
	ExistsCompanyOnDataBase,
	ExistsProductById
};