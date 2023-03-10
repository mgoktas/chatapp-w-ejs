const { DataTypes } = require("sequelize");
const sequelize = require("../js/config/mysql");
const bcrypt = require('bcrypt')

const Message = sequelize.define("message", {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    msg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sentDate: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {timestamps: false});

// async function sync (){ 
// try{
// await Message.sync()

// await Message.create({
//     senderId:1,
//     receiverId:2,
//     msg: 'hey'
// })}
// catch(err){
//     console.log(err)
// }}

module.exports = Message