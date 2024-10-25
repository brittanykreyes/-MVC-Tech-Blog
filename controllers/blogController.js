const { Blog, User } = require('../models');

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.findAll({ include: User });
  res.render('homepage', { blogs });
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, { include: User });
  res.render('blog', { blog });
};

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  await Blog.create({ title, content, userId: req.session.userId });
  res.redirect('/dashboard');
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  blog.title = req.body.title;
  blog.content = req.body.content;
  await blog.save();
  res.redirect('/dashboard');
};

exports.deleteBlog = async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } });
  res.redirect('/dashboard');
};
