'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const demo_title = faker.name.title();
    const other_title = faker.name.title();
    return queryInterface.bulkInsert(
      "Albums",
      [
        {
          user_id: 1,
          title: 'Wildlife',
        },
        {
          user_id: 1,
          title: `Mountains`,
        },
        {
          user_id: 1,
          title: `Forest`,
        },
        {
          user_id: 1,
          title: `Winter Forest`,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
