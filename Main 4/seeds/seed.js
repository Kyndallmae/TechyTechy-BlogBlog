const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userInfo = [
  {
     name: 'Guest',
     email: 'guest@example.com',
     password: '00000000',
  },
];

const postInfo = [
  {
     date: new Date().toLocaleString(),
     body: 'Hello User!',
     title: 'First Post',
     user_id: 1,
  },
  {
     date: new Date().toLocaleString(),
     body: 'Hello User 2!',
     title: 'Second Post',
     user_id: 1,
  },
];

const commentInfo = [
  {
     body: 'Hello User 3',
     user_id: 1,
     post_id: 1,
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userInfo, {
     individualHooks: true,
     returning: true,
  });

  await Post.bulkCreate(postInfo, {
     returning: true,
  });

  await Comment.bulkCreate(commentInfo, {
     returning: true,
  });

  process.exit(0);
};

seedDatabase();
