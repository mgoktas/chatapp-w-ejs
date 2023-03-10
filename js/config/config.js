var fs = require('fs');
const Sequelize = require('sequelize');
const config = {
    db: {
        host:"", 
        user:"", password:"",
        port:3306, 
        multipleStatements: true,
        database: '',
        ssl:{ca:fs.readFileSync("/Users/admin/Downloads/DigiCertGlobalRootCA.crt.pem")}
        },
        email: {
            username:'',
            password: '',
            host: '',
            from: ''

        }

}

module.exports = config