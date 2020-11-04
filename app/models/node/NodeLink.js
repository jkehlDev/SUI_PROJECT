const sequelize = require('../../DB/sequelize_client');
const {
    DataTypes,
    Model,
    INTEGER
} = require('sequelize');

/**
 * @version 1.0.0
 * @description NodeLinks class model.
 */
class NodeLink extends Model {}

NodeLink.init({
    nodesFromId: DataTypes.INTEGER,
    NodeId: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'nodeLinks'
});

module.exports = NodeLink;