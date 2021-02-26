'use strict';
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('houses', [{
      city: 'Camboriú',
      state: 'Santa Catarina',
      district: 'Areias',
      address: 'Endereço Fictício',
      description:' Nome do prédio',
      price: 13.30,
      owner: 'Josenildo',
      imageUrl: null,
      roomQuantity: 3,
      bathroomQuantity: 3,
      balconyQuantity: 3,
      carSpotQuantity: 4,
      availableForRentStartDate:new Date(),
      availableForRentEndDate: new Date().addDays(30),
      }], {});
  []
  },

  down: async (queryInterface, Sequelize) => {
    /**
     Add commands to revert seed here.
    
     Example:
     await queryInterface.bulkDelete('People', null, {});
    */
  }
};
