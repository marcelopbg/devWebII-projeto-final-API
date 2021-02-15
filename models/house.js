'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class house extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  house.init({
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    owner: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    roomQuantity: DataTypes.INTEGER,
    bathroomQuantity: DataTypes.INTEGER,
    balconyQuantity: DataTypes.INTEGER,
    carSpotQuantity: DataTypes.INTEGER,
    availableForRentStartDate: DataTypes.DATE,
    availableForRentEndDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'house',
  });
  return house;
};