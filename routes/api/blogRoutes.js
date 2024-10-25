const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blogController');
const { Blog } = require('../../models');

// Middleware to check if user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

router.get('/', blogController.getAllBlogs);
router.get('/new', withAuth, (req, res) => {
  res.render('newBlog');
});
router.post('/', withAuth, blogController.createBlog);
router.get('/:id', blogController.getBlogById);
router.put('/:id', withAuth, blogController.updateBlog);
router.delete('/:id', withAuth, blogController.deleteBlog);

module.exports = router;
