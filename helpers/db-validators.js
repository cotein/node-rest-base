const {Role, Category} = require('../models');
const {User} = require('../models');

const ValidRole = async (role = '') => {
    const existsRol = await Role.findOne({role});
    if (! existsRol ) {
        throw new Error(`El rol ${role} no existe en la base de datos`);
    }
}

const ExistsEmail = async (email = '') => {
    const existsEmail = await User.findOne({email});
    if ( existsEmail ) {
        throw new Error(`El email ${email} ya existe en la base de datos`);
    }
}

const ExistsUserById = async (id = '') => {
    const existsUserById = await User.findById(id);
    if ( !existsUserById ) {
        throw new Error(`No existe Usuario con el ID, ${id}`);
    }
}

const ExistsCategoryById = async (id = '') => {
    const existsCategoryById = await Category.findById(id);
    if (! existsCategoryById ) {
        throw new Error(`No existe Categorìa con el ID, ${id}`);
    }
}

module.exports = {
    ValidRole,
    ExistsEmail,
    ExistsUserById,
    ExistsCategoryById
}