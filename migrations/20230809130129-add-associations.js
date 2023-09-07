'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
        OnDelete: 'CASCADE',
        references: {
          model: 'roles',
          key: 'id',
          as: 'roleId',
        },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'roleId')
    
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
