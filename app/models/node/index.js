const Node = require('./Node');
const NodeLinks = require('./NodeLinks');

Node.belongsToMany(Node, {
    foreignKey: 'nodeFromId',
    otherKey: 'nodeToId',
    as: 'nodesFrom',
    through: 'nodeLinks'
});

Node.belongsToMany(Node, {
    foreignKey: 'nodeToId',
    otherKey: 'nodeFromId',
    as: 'nodesTo',
    through: NodeLinks
});

module.exports = {
    Node
}