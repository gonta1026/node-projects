'use strict';
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    taskname: DataTypes.STRING
  }, {
    underscored: true,
  });
  task.associate = function(models) {
    // associations can be defined here
  };
  return task;
};

