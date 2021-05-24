const fs = require('fs');
const { v4: uuidv4, parse } = require('uuid');
const path = require('path');

module.exports = (app) => {

  // Post new note
  app.post('/api/notes', (req, res) => {
      const newNote = req.body;
      // assign specific ID for each note
      newNote.id = uuidv4();

      fs.readFile(`${__dirname}/../../db/db.json`, (err, data) => {
          if (err) throw err;

          let savedNotes = JSON.parse(data);
          savedNotes.push(newNote);
          fs.writeFile(`${__dirname}/../../db/db.json`, JSON.stringify(savedNotes), (err, data) => {
              if (err) throw err
              console.log("Success! Your note was saved (:")
              res.json(newNote)
          })
      })
  });

  // Get all notes
  app.get('/api/notes', (req, res) => {
    fs.readFile(`${__dirname}/../../db/db.json`, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
  });

  // Delete note by ID
  app.delete("/api/notes/:id", (req, res) => {
    const noteID = req.params.id

    fs.readFile(`${__dirname}/../../db/db.json`, 'utf8', (err, notes) => {
      if (err) throw err;
      notes = JSON.parse(notes);
      notes = notes.filter(note => note.id != noteID)

      fs.writeFile(`${__dirname}/../../db/db.json`, JSON.stringify(notes), (err, data) => {
        if (err) throw err;
        res.json(notes)
      })
    })
  })
};