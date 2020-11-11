const bcrypt = require('bcrypt');
const sequelize = require('../DB/sequelize_client');

const {
    DataTypes,
    Model
} = require('sequelize');

/**
 * @version 1.0.0
 * @description User class model.
 */
class User extends Model {
    getUserObj() {
        return {
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin,
            isSignIn: true
        };
    }
}

User.init({
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
}, {
    sequelize,
    tableName: 'user'
});

module.exports = User;