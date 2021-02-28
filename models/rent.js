'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rent.belongsTo(models.house, { foreignKey: 'house_id' });
    }
  };
  rent.init({
    house_id: DataTypes.INTEGER,
    tenant: DataTypes.STRING,
    tenantPhone: DataTypes.STRING,
    tenantDocument: DataTypes.STRING,
    tenantEmail: DataTypes.STRING,
    rentStartDate: DataTypes.DATE,
    rentEndDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'rent',
  });
  return rent;
};