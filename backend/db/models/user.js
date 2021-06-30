"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, profileImageUrl } = this; // context will be the User instance
      return { id, username, email, profileImageUrl };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    static async signup({ username, email, password, profileImageUrl }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        profileImageUrl,
      });

      return await User.scope("currentUser").findByPk(user.id);
    }
    static associate(models) {
      const columnMappingOne = { // User -> User, through Follow as follower
        through: 'Follows',
        otherKey: 'following_id',
        foreignKey: 'follower_id',
        as: 'followings'
      }
      const columnMappingTwo = { // User -> User, through Follow as following
        through: 'Follows',
        otherKey: 'follower_id',
        foreignKey: 'following_id',
        as: 'followers'
      }

      User.hasMany(models.Album, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: 'true' });
      User.belongsToMany(models.User, columnMappingOne);
      User.belongsToMany(models.User, columnMappingTwo);
      User.hasMany(models.Favorite, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: 'true' });
      User.hasMany(models.Comment, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: 'true' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      profileImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
