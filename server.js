const express = require('express');
const session = require('express-session');
const  SequelizeStore  = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const userRoutes = require('./routes/api/userRoutes');
const blogRoutes = require('./routes/api/blogRoutes');
const commentRoutes = require('./routes/api/commentRoutes');
const renderRoutes = require("./routes/view/renderRoutes")

dotenv.config();

const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3003;

const sessionStore = new SequelizeStore({
  db: sequelize,
});

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
};

app.use(session(sess));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

app.use('/', renderRoutes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

