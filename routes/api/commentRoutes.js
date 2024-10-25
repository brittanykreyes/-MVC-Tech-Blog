const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');
const { Comment } = require('../../models');

// Middleware to check if user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

router.post('/', withAuth, commentController.addComment);

module.exports = router;
