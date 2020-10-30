const Node = require('./Node');

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
    through: 'nodeLinks'
});

module.exports = {
    Node
}