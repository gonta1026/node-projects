'use strict';
module.exports = (sequelize, DataTypes) => {
  const Human = sequelize.define('Human', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  Human.associate = function(models) {
    // associations can be defined here
    models.Human.hasMany(models.Pet);
  };
  return Human;
};