'use strict';
module.exports = (sequelize, DataTypes) => {
  const communities_users = sequelize.define('communities_users', {
    community_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  communities_users.associate = function(models) {
    // associations can be defined here
  };
  return communities_users;
};