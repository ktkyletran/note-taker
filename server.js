// Dependencies
const express = require('express');
const path = require('path');
const fs = require ('fs');

// Express configuration
const app = express();
const PORT = process.env.PORT || 3000;

// Loading Data
const noteData = require('./db/db.json');
const { Console } = require('console');

// Data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// gives server routes to respond through
require('./public/routes/apiRoutes')(app);
require('./public/routes/htmlRoutes')(app);

// Listener
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
});