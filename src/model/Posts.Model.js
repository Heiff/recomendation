const {Model, DataTypes} = require("sequelize");
const sequelize = require('../database/sequelize');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tags:{
        type:DataTypes.STRING,
        allowNull:false
    },
    post:{
        type:DataTypes.STRING,
        allowNull:false
    }
  },
  {
    sequelize,
    tableName: "posts",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Posts