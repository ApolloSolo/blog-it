const express = require("express");
const app = express();
const sequelize = require("./config/connection");
const routes = require("./controllers");
const path = require('path');
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers')
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    }),
    cookie: {
      maxAge: 60000 * 5
    }
  };
  
  app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
