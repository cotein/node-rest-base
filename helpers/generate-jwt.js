const jwt = require('jsonwebtoken');

const generateJWT = (uid = '', expiresIn='4h') => {

	return new Promise( (resolve, reject) => {

		const payload = {uid};

		jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
			expiresIn
		}, (err, token) => {

			if (err) {
				console.log(err);
				reject('No se generó el JWT');
			}else{
				resolve(token);
			}
		});


	});
};

const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, process.env.SECRETPRIVATEKEY, (err, decoded) => {
        if(err) {
            console.log('Error al obtener data del token');
        } else {
            data = decoded;
        }
    });

    return data;
}

module.exports = {
	generateJWT,
	getTokenData
};