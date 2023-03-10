const nodemailer = require('nodemailer')
const config = require('../js/config/config')


var tranporter = nodemailer.createTransport({
    service: 'hotmail',
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: config.email.username,
        pass: config.email.password,
        clientId: '',
        clientSecret: '',
        subject: 'Account Update',
        text: 'Account is succesfully created. '
    }
});

module.exports = tranporter;