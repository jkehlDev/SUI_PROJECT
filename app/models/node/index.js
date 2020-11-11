const Node = require('./Node');

Node.belongsToMany(Node, {
    as: 'childs',
    through: 'node_has_node'
})

// const sequelize = require('../../DB/sequelize_client');
// sequelize.sync({
//     force: false
// });

module.exports = {
    Node
}