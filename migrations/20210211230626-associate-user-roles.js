'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'user_roles',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: { model: 'users', key: 'id' }
        },
        roleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: { model: 'roles', key: 'id' }
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_roles');
  }
};
