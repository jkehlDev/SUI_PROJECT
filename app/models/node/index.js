const Node = require('./Node');
const NodeLink = require('./NodeLink');

// Node.hasMany(NodeLinks, {
//     foreignKey: 'nodeToId',
//     as: 'nodesFrom',
// });

// Node.hasMany(NodeLinks, {
//     foreignKey: 'nodeFromId',
//     as: 'nodesTo',
// });

Node.belongsToMany(Node, {
    as: 'nodesFrom',
    through: NodeLink
})

module.exports = {
    Node, NodeLink
}