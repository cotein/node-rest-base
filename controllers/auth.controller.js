const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models');
const { generateJWT, getTokenData } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getEmailTemplate } = require('../helpers/email.template');
const { sendEmail } = require('../helpers/send.email');

const login = async (req, res = response) => {

	const { email, password } = req.body;
	//verificar si el mail existe
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({
			msg: 'Usuario / pass incorrectos - correo'
		});
	}

	/* if (! user.validatedEmail) {
        return res.status(400).send({
          message: "Su email esta pendiente de validación",
        });
    } */

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
        console.log("🚀 ~ file: auth.controller.js ~ line 97 ~ register ~ req.body", req.body)
        const { name,
				lastName,
				email,
				password 
			} = req.body.userForm;

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
		const userData = {
			name,
			lastName,
			email,
			password,
			role: 'ADMIN_ROLE',
			google: false,
			codeVerificationEmail
		};

        user = new User(userData);

        // Generar token
        const token = generateJWT({ email, codeVerificationEmail });

        // Obtener un template
        const template = getEmailTemplate(name, token);

        // Enviar el email
        await sendEmail(email, 'Este es un email de prueba', template);
        await user.save();

        res.json({
            success: true,
            msg: 'Registrado correctamente'
        });

    } catch (error) {
        console.log("🚀 ~ file: auth.controller.js ~ line 130 ~ register ~ error", error)
        return res.json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }

}

const confirm = async (req, res) => {
    try {

       // Obtener el token
       const { token } = req.params;
       
       // Verificar la data
       const data = await getTokenData(token);

       if(data === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
       }

       console.log("🚀 ~ file: auth.controller.js ~ line 173 ~ confirm ~ data", data)

       const { email, code } = data.data;

       // Verificar existencia del usuario
       const user = await User.findOne({ email }) || null;

       if(user === null) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
       }

       // Verificar el código
       if(code !== user.code) {
            return res.redirect('/error.html');
       }

       // Actualizar usuario
       user.status = 'VERIFIED';
       await user.save();

       // Redireccionar a la confirmación
       return res.redirect('/confirm.html');
        
    } catch (error) {
        console.log("🚀 ~ file: auth.controller.js ~ line 199 ~ confirm ~ error", error)
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}
module.exports = {
	login,
	googleSignIn,
	register,
	confirm
};