const { DataTypes } = require("sequelize");
const sequelize = require("../js/config/mysql");

const UserType = sequelize.define("usertype", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'regular'
    }

}, {timestamps: false});

module.exports = UserType;