const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Initializes the Post
Post.init(
   {
      // Adds id
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      // Adds body
      body: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: '',
      },
      // Adds date
      date: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // Adds title 
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      // Adds a reference to the user
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'user',
            key: 'id',
         },
      },

      // Adds a reference to the comment
      comment_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'comment',
            key: 'id',
         },
      },
   },
   {
      sequelize,
      underscored: true,
      modelName: 'post',
      freezeTableName: true,
   },
);

module.exports = Post;