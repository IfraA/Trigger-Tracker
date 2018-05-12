var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var Triggers = sequelize.define("Triggers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    triggerName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Triggers;
};
