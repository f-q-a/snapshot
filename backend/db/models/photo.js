'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    album_id: DataTypes.INTEGER,
    img_url: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.Album, {foreignKey: 'album_id'});
    Photo.hasMany(models.Tag, {foreignKey: 'photo_id', onDelete: 'CASCADE', hooks: 'true'});
    Photo.hasMany(models.Favorite, { foreignKey: 'photo_id', onDelete: 'CASCADE', hooks: 'true' });
    Photo.hasMany(models.Comment, { foreignKey: 'photo_id', onDelete: 'CASCADE', hooks: 'true' });
  };
  return Photo;
};
