const sequelize = require('../../DB/sequelize_client');
const {
    DataTypes,
    Model
} = require('sequelize');

/**
 * @version 1.0.0
 * @description Node class model.
 */
class Node extends Model {
}

Node.init({}, {
    sequelize,
    tableName: 'nodes'
});

module.exports = Node;