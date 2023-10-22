const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
   checkPassword(pass) {
      return bcrypt.compareSync(pass, this.password);
   }
}
// Iitializes the User
User.init(
   {
      // Adds unique id
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },

      // adds the username
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      // Adds email
      email: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
         validate: {
            isEmail: true,
         },
      },

      // Adds password
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [8],
         },
      },
   },
   {
      hooks: {
         // Adds hashed password to the user
         beforeCreate: async function (user) {
            user.password = await bcrypt.hash(user.password, 10);
            return user;
         },
         // Adds hashed password to the user
         beforeUpdate: async function (user) {
            user.password = await bcrypt.hash(user.password, 10);
            return user;
         },
      },
      sequelize,
      underscored: true,
      modelName: 'user',
      freezeTableName: true,
   },
);

module.exports = User;