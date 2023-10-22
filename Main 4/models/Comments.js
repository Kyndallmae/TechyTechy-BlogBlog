const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Adds Comments class 
class Comments extends Model {}
// Initializes the Comment
Comments.init(
   {
      // Adds the id
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      // Adds the text to the comment
      body: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      // adds a reference to the user
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'user',
            key: 'id',
         },
      },

      // adds a reference to the post
      post_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'post',
            key: 'id',
         },
      },
   },
   {
      sequelize,
      underscored: true,
      modelName: 'comments',
      freezeTableName: true,
   },
);

module.exports = Comments;