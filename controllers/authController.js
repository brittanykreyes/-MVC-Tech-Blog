const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashedPassword });
  req.session.userId = username; // log in user after sign up
  res.redirect('/');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = username;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
