const { DataTypes } = require("sequelize");
const sequelize = require("../js/config/mysql");
const bcrypt = require('bcrypt')

const User = sequelize.define("user", {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "You must write your name."
            },
            isName(value){
                if (value.length>30){
                    throw new Error('Name value can not exceed 30 characters.')
                }
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "This username is already in use, please choose another username"
        },
        validate: {
            len: {
                args: [0, 30],
                msg: "Password should have  at most 30 characters."
            },
            notEmpty: {
                msg: "You must write a username."
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
            args: true,
            msg: "This email is already in use, please choose another email"
        },
        validate: {
            len: [0,40],
            notEmpty: {
                msg: "You must write your email."
            }        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [0,24],
            notEmpty: {
                msg: "You must choose a password."
            }        }
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    addDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    typeId: {
        type: DataTypes.INTEGER,
    },
    msgId: {
        type: DataTypes.INTEGER,
    },
    resetToken:  {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiry:  {
        type: DataTypes.DATE,
        allowNull: true 
    },
    lastLoginTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    messageId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {timestamps: false});

User.afterValidate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;