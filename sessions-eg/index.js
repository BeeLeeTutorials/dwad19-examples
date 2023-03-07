const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { handlebars } = require('hbs');

handlebars.registerHelper('if', function (conditional, options) {
  if (conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

const app = express();
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  store: new FileStore(),
  secret: 'my_secret',
  resave: false,
  saveUninitialized: true,
}));

// Show the index page
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.render('index.hbs', { loggedIn: true, username: req.session.user.username });
  }
  res.render('index.hbs');
});

// Login form and form data handling
app.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }

  res.render('login.hbs');
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== 'admin' || password !== 'admin') {
    return res.status(403).send("Forbidden");
  }

  req.session.user = {
    id: 1,
    username: 'admin',
  };
  req.session.save(() => {
    res.redirect('/');
  });
});

// Logout page
app.get('/logout', (req, res) => {
  req.session.user = null;
  req.session.save(() => {
    // We want the session store saving to complete before we redirect.
    // It is a possible race-condition here - the saving could be still in progress, but
    // the user gets redirected first if it weren't for this callback.
    res.redirect('/');
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});