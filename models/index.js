const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../context/dbContext');

const Peca = require('./Peca')(sequelize, DataTypes);
const Componente = require('./Componente')(sequelize, DataTypes);


Peca.hasMany(Componente, { foreignKey: 'codigo', sourceKey: 'codigo' });
Componente.belongsTo(Peca, { foreignKey: 'codigo', targetKey: 'codigo' });

module.exports = { sequelize, Peca, Componente };
