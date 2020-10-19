const express = require('express');
const path = require('path');
const hbs = require('hbs');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
const LocalStrategy = require('passport-local').Strategy;
const indexRouter = require('./src/routes/index');
const regRouter = require('./src/routes/reg');
const logRouter = require('./src/routes/log');
const mainRouter = require('./src/routes/main');
const logoutRouter = require('./src/routes/logout');
const route = require('./src/routes/route');

const userRoleMiddleware = require('./middlewares/checkRole');

const User = require('./src/models/user.model');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));
hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);

passport.use(
  'local',
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ username: username }, async (err, user) => {
        if (err) return done(err);
        if (!user)
          return done(
            null,
            false,
            req.flash('error', 'Пользователь не найден')
          );
        if (!(await user.verifyPassword(password)))
          return done(null, false, req.flash('error', 'Неверный пароль'));
        return done(null, user);
      });
    }
  )
);

app.use(userRoleMiddleware);

app.use('/', indexRouter);
app.use('/register', regRouter);
app.use('/login', logRouter);
app.use('/main', mainRouter);
app.use('/logout', logoutRouter);
app.use('/route', route);

module.exports = app;
