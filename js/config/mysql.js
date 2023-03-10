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

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: 'mysql',
    host: config.db.host,
    port: 3306,    
    multipleStatements: true,
    dialectOptions: {
        ssl: {
          ca: fs.readFileSync("/Users/admin/Downloads/DigiCertGlobalRootCA.crt.pem")
        }},
    storage: "./session.mysql"
})

async function connect(){
    try {
        await sequelize.authenticate()
        console.log('mysql sequelize connected')
    }
    catch(err){
        console.log('error' , err)
    }
}

connect()

module.exports = sequelize
