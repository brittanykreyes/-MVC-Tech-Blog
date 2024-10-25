const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.create({ username: 'user1', password: 'password' });

  const blog1 = await Blog.create({
    title: 'First Blog Post',
    content: 'This is the content of the first blog post.',
    userId: user.id
  });

  await Comment.create({
    content: 'Great post!',
    blogId: blog1.id,
    userId: user.id
  });

  console.log('Database seeded!');
};

seedDatabase();
