const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.set('view engine', 'hbs')

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})