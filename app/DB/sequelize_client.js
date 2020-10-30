require('dotenv').config();
const {Sequelize} = require('sequelize');

/**
 * @version 1.0.0
 * @description Sequelise client module
 */
const sequelize_client = new Sequelize(
    process.env.PG_URL,
    {
        define: {
            underscored: true,
            timestamps: false
        },
        logging: false
    }
);

module.exports = sequelize_client;