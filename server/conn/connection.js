const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect('mongodb://localhost/mern-todo-assignment', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });