const connection = require("../lib/sequelize");
const { Model, DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

class User extends Model {}

User.init(
  //Schema
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    paranoid: true,
  }
);

const cryptPassword = /* 1BBCFG34237 */ async (user) => {
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
};
User.addHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);
User.addHook("beforeUpdate", /* 1BBCFG34237 */ cryptPassword);
//User.removeHook("beforeCreate", /* 1BBCFG34237 */ cryptPassword);


module.exports = User;