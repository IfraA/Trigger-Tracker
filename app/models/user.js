var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    pollen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    smog: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    smoke: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  return User;
};
