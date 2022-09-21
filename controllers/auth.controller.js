const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

	const { email, password } = req.body;
	//verificar si el mail existe
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({
			msg: 'Usuario / pass incorrectos - correo'
		});
	}

	if (! user.validatedEmail) {
        return res.status(400).send({
          message: "Su email esta pendiente de validación",
        });
    }

	//si el usuario esta activo
	if (!user.status) {
		return res.status(400).json({
			msg: 'Usuario / pass incorrectos - status false'
		});
	}

	//verificar contraseña
	const validPassword = bcryptjs.compareSync(password, user.password);
	if (!validPassword) {
		return res.status(400).json({
			msg: 'Usuario / pass incorrectos - password'
		});
	}

	//generar jwt
	const token = await generateJWT(user.id);
	res.json({ user, token });
};

const googleSignIn = async (req, res = response) => {

	const { id_token } = req.body;

	try {

		const { name, email, img, lastName } = await googleVerify(id_token);

		let user = await User.findOne({ email });

		if (!user) {
			//creo usuario
			const data = {
				name,
				lastName,
				email,
				password: ':p',
				img,
				role: 'ADMIN_ROLE',
				google: true
			};

			user = new User(data);
			await user.save();
		}

		if (!user.status) {
			res.status(401).json({
				msg: 'Hable con el administrador, Usuario bloqueado'
			});
		}

		const token = await generateJWT(user.id);

		res.json({ user, token });

	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msg: 'No se pudo autenticar con google'
		});
	}
};

const register = async (req, res = response) => {

	try {

        // Obtener la data del usuario: name, email
        const { name, email } = req.body;

        // Verificar que el usuario no exista
        let user = await User.findOne({ email }) || null;

        if(user) {
            return res.json({
                success: false,
                msg: 'Usuario ya existe'
            });
        }

        // Generar el código
        const codeVerificationEmail = uuidv4();

        // Crear un nuevo usuario
        user = new User({ name, email, codeVerificationEmail });

        // Generar token
        const token = generateJWT({ email, codeVerificationEmail });

        // Obtener un template
        const template = getTemplate(name, token);

        // Enviar el email
        await sendEmail(email, 'Este es un email de prueba', template);
        await user.save();

        res.json({
            success: true,
            msg: 'Registrado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }

}
module.exports = {
	login,
	googleSignIn,
	register
};