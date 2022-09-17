/* eslint-disable indent */
const { Product, User, Company } = require('./../models');

const basicInitialData = async () => {

	await Product.deleteMany({});
	await User.deleteMany({});
	await Company.deleteMany({});
	const company = new Company({
		name: 'Transportes Menconi',
		cuit: '20008721123',
	});
	await company.save();

	const user = new User({
		name: 'Diego',
		lastName: 'Barrueta',
		email: 'diego.barrueta@gmail.com',
		password: 123456,
		role: 'ADMIN_ROLE',
		company: company.id,
    
	});
	await user.save();

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