'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, { foreignKey: 'user_id' });
    Album.hasMany(models.Photo, {foreignKey: 'album_id', onDelete: 'CASCADE', hooks: 'true'});

  };
  return Album;
};
