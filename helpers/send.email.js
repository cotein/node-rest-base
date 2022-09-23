const nodemailer = require('nodemailer');

const mail = {
    user: 'micorreo@gmail.com',
    pass: 'micontraseña'
}

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    tls: {
        rejectUnauthorized: false
    },
    secure: false, // true for 465, false for other ports
    auth: {
        user: "4b41d968641aad",
        pass: "7674109ae4a020"
      }
  });

const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `MHCode <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hola amigos, suscríbance para más videos", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}


module.exports = {
    sendEmail
}