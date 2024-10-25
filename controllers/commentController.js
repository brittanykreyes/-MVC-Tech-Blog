const { Comment } = require('../models');

exports.addComment = async (req, res) => {
  const { content, blogId } = req.body;
  await Comment.create({ content, blogId, userId: req.session.userId });
  res.redirect(`/blog/${blogId}`);
};
