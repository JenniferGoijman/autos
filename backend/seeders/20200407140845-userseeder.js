'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        email: 'john@doe.es',
        password: 'johndoe'
      },
      {
        name: 'Jenny',
        email: 'jgoijman@gmail.com',
        password: '123'
      }, 
      {
        name: 'Alex',
        email: 'alex@gmail.com',
        password: '123'
      }
    ], {});
    /*
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};