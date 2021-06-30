'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    user_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.Photo, {foreignKey: 'photo_id'});
    Favorite.belongsTo(models.User, {foreignKey: 'user_id'});
    
  };
  return Favorite;
};
