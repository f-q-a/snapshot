'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    user_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {foreignKey: 'user_id'});
    Comment.belongsTo(models.Photo, {foreignKey: 'photo_id'});
  };
  return Comment;
};
