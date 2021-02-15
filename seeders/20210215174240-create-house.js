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
      state: 'SC',
      district: 'Areias',
      address: 'Endereço Fictício',
      description:' Nome do prédio',
      price: 'R$ 13,00',
      owner: 'Josenildo',
      imageUrl: null,
      roomQuantity: 3,
      bathroomQuantity: 3,
      balconyQuantity: 3,
      carSpotQuantity: 4,
      availableForRentStartDate:new Date(),
      availableForRentEndDate: new Date().addDays(5),
      // availableForRentEndDate: new Date().setDate(new Date() + 1),
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
