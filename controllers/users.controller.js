const {response} = require('express');
const bcrypt = require('bcryptjs');
const {User} = require('../models');

const usersGet = async (req, res = response) => {

	const activeUsers = {status : true};
	//const {page, limit, q} = req.query;
	const {limit = 5, desde = 0} = req.query;

	/* const users = await User.find(activeUsers)
        .skip(Number(desde))
        .limit(Number(limit));

    const total = await User.countDocuments(activeUsers); */

	const [total, users] = await Promise.all([
		User.countDocuments(activeUsers),
		User.find(activeUsers)
			.skip(Number(desde))
			.limit(Number(limit))
	]);

	res.json({ total, users });
};

const usersPost = async (req, res = response) => {

	const body = req.body;
	const user = new User(body);
	//verificar si ya esta persisitido el email

	//ecnriptar contraseña
	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(body.password, salt);
	await user.save();

	res.json(user);
};

const usersPut = async (req, res = response) => {

	const {id} = req.params;

	// eslint-disable-next-line no-unused-vars
	const {_id, password, google, email, ...resto} = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		resto.password = bcrypt.hashSync(req.body.password, salt);
	}

	const user = await User.findByIdAndUpdate(id, resto);

	res.json(user);
};

const usersDelete = async(req, res = response) => {

	const {id} = req.params;

	const user = await User.findByIdAndUpdate(id, {status : false});

	res.json(user);
};

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersDelete
};