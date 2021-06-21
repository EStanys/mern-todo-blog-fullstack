require('dotenv').config();  //envirnment variables



const express = require('express');
const app = express();
const path = require('path')

const mongoose = require('mongoose');


const todoRoutes = require('./src/Routes/apiTodoRoutes');
const TodoFavorites = require('./src/Routes/apiTodoFavorites');
const blogRoutes = require('./src/Routes/apiBlog');

const cors = require('cors');

const PORT = process.env.PORT || 3001; // jei bus heroku nustatytas portas mes ji imsim is env

app.use('/api/todo', todoRoutes);
app.use('/api/todo/favorites', TodoFavorites);
app.use('/api/blog', blogRoutes);

const rootBuild = path.join(__dirname, 'client', 'build')
// pasitikrinti ar musu aplinka yra production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(rootBuild))

  // visas srautas nukreipiams per produkcijos sukurta index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join('index.html', { root: rootBuild }))
  })
}

mongoose.connect(process.env.MONGO_CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
  console.log('Connected to db');
  app.listen(PORT);
});

app.use(cors());

// for req.body to work
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// 404 case - kai vartojas ivede psl kurio nera
app.use((req, res) => res.status(404).send('OOPs Page not found'));
