'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    photo_id: DataTypes.INTEGER,
    descriptor: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsTo(models.Photo, {foreignKey: 'photo_id'});
  };
  return Tag;
};
