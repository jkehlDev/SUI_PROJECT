const bcrypt = require('bcrypt');
const sequelize = require('../../DB/sequelize_client');

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
            name : this.name,
            email: this.email,
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
}, {
    sequelize,
    tableName: 'users'
});

User.beforeCreate(function (user) {
    
    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) {
            console.error(error);
            throw error;
        }
        user.password = hash;
        user.save();
    });
});

module.exports = User;