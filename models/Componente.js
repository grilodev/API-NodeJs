module.exports = (sequelize, DataTypes) => {
    const Componente = sequelize.define('Componente', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      SKU: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preco: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'componentes',
      timestamps: false
    });
  
    return Componente;
  };
  