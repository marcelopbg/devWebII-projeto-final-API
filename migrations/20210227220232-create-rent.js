'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      house_id: {
        type: Sequelize.INTEGER,
      },
      tenant: {
        type: Sequelize.STRING
      },
      tenantDocument: {
        type: Sequelize.STRING
      },
      tenantPhone: {
        type: Sequelize.STRING
      },
      tenantEmail: {
        type: Sequelize.STRING
      },
      rentStartDate: {
        type: Sequelize.DATE
      },
      rentEndDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rents');
  }
};