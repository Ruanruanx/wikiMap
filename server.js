
// load .env data into process.env
require('dotenv').config();
const mapQueries = require('./db/queries/maps');


// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const cookieSession = require('cookie-session');


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const mapRoutes = require('./routes/map_routers');
//const { Session } = require('inspector');
const login = require('./routes/login');
//const editRoute = require('./routes/map_routers');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
app.use('/maps', mapRoutes);

// app.use('/maps/:id',mapRoutes);
app.use('/login',login);
//app.use('/edit/:id', editRoute);
//app.use('/maps/:id',mapRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get('/', (req, res) => {
  let tempVars={};
  const userId = req.session.userId;
  mapQueries.getMaps()
  .then(maps=>{
    tempVars.maps=maps;
    tempVars.userId=userId;
    res.render('index', tempVars);
  })
  // console.log(req.session['userId'])
  // res.render('index');
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
