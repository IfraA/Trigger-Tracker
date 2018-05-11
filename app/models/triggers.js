module.exports = function (sequelize, DataTypes) {
  var Triggers = sequelize.define("Triggers", {
    triggerName: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 0,
      validate: {
        len: [1]
      }
    },
    userName: {
      type: DataTypes.STRING,
      default: 0,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Triggers;
};
