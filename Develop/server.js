// Dependencies
const { json } = require('express');
const express = require('express');
const path = require('path');
const fs = require ('fs');

// Express configuration
const app = express();
const PORT = process.env.PORT || 8080;

// Loading Data
const noteData = require('../Develop/db/db.json')

// Data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// HTML GET Requests
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// API Get Requests
app.get('/api/notes', (req, res) => {res.json(noteData)});
// app.get('/api/notes', (req, res) => {
//   fs.readFile((path.join(__dirname, './db/db.json')), (err, data) => {
//     if (err) {
//       console.error(err)
//       return;
//     }
//     else {
//       res.send(data)
//     }
//   });
// });

// API Post Requests
app.post('/api/notes', (req, res) => {
  // res.sendFile(path.join(__dirname, './public/notes.html'));
  res.redirect('/');
  noteData.push(req.body);
});


// Listener
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
});