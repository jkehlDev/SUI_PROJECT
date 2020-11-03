const sequelize = require('../../DB/sequelize_client');
const {
    DataTypes,
    Model
} = require('sequelize');

/**
 * @version 1.0.0
 * @description User class model.
 */
class Node extends Model {}

Node.init({
    nodeToId: DataTypes.INTEGER,
    nodeFromId: DataTypes.INTEGER,
}, {
    sequelize,
    tableName: 'nodeLinks'
});

module.exports = Node;