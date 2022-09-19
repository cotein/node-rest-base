/* eslint-disable indent */
const { Product, User, Company } = require('./../models');
const bcryptjs = require('bcryptjs');

const createCompany = async () => {

	const company = new Company({
		name: 'Transportes Menconi',
		cuit: '20008721123',
	});

	const newCompany = await company.save();

	return newCompany;
}

const createUser = async (company) => {
	
	const salt = bcryptjs.genSaltSync();
	const password = bcryptjs.hashSync("123456", salt);

	const user = new User({
		name: 'Diego',
		lastName: 'Barrueta',
		email: 'diego.barrueta@gmail.com',
		password,
		role: 'ADMIN_ROLE',
		company: company.id,
    
	});
	
	const newUser = await user.save();

	return newUser;
}
const basicInitialData = async () => {
	
	await Product.deleteMany({});
	await User.deleteMany({});
	await Company.deleteMany({});

	const company = await createCompany();

	const user = await createUser(company);

    const initialProducts = [
        {
            name: 'www',
            status: true,
            user: user.id,
            company: company.id
        },
        {
            name: 'www otro',
            status: true,
            user: user.id,
            company: company.id
        },
        {
            name: 'www otro más',
            status: false,
            user: user.id,
            company: company.id
        }
    ];

	initialProducts.forEach( async (product) => {
		const prod = new Product(product);
		await prod.save();
	});
};

module.exports = {
	basicInitialData,
};