'use strict';
const faker = require("faker");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Photos",
      [
        {
          album_id: 9,
          img_url: faker.image.imageUrl(300, 300, "animals", true)
        },
        {
          album_id: 9,
          img_url: faker.image.imageUrl(300, 300, "animals", true)
        },
        {
          album_id: 9,
          img_url: faker.image.imageUrl(300, 300, "animals", true)
        },
        {
          album_id: 9,
          img_url: faker.image.imageUrl(300, 300, "animals", true)
        },{
          album_id: 9,
          img_url: faker.image.imageUrl(300, 300, "animals", true)
        },
        {
          album_id: 9,
          img_url: faker.image.animals(),
        },{
          album_id: 9,
          img_url: faker.image.animals(),
        },
        {
          album_id: 9,
          img_url: faker.image.animals(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
