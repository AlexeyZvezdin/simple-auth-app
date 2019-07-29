const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  let Profile = sequelize.define(
    "Profile",
    {
      name: Sequelize.STRING,
      surname: Sequelize.STRING,
      country: Sequelize.STRING,
      city: Sequelize.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Profile"
    }
  );

  User.hasOne(Profile);

  return { User, Profile };
};
