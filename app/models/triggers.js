module.exports = function (sequelize, DataTypes) {
  var Burgers = sequelize.define("triggers", {
    triggers: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });
  return triggers;
};
