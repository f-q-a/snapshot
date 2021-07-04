'use strict';
const faker = require("faker");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          user_id: 1,
          photo_id: 1,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 2,
          photo_id: 1,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 3,
          photo_id: 1,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 2,
          photo_id: 1,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 3,
          photo_id: 1,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 1,
          photo_id: 1,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 2,
          photo_id: 1,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 3,
          photo_id: 1,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 1,
          photo_id: 2,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 2,
          photo_id: 2,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 3,
          photo_id: 2,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 1,
          photo_id: 3,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 2,
          photo_id: 3,
          body: faker.lorem.sentences(3),

        },
        {
          user_id: 3,
          photo_id: 3,
          body: faker.lorem.sentences(3),

        },

      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
