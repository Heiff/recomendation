const {Model, DataTypes} = require("sequelize");
const sequelize = require('../database/sequelize');

class Auth extends Model {}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    recomendations:{
        type:DataTypes.STRING,
        allowNull:true
    }
  },
  {
    sequelize,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Auth