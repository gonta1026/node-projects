'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: DataTypes.STRING,
    kind: DataTypes.STRING
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
    models.Pet.belongsTo(models.Human);
  };
  return Pet;
};