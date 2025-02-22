module.exports = (sequelize, DataTypes) => {
    const Peca = sequelize.define('Peca', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'pecas',
      timestamps: false
    });
  
    return Peca;
  };
  