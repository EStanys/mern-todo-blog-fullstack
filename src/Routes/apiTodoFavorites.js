const express = require('express')
const router = express.Router()

const TodoFavorites = require('../models/favorites')

router.get('/', (req, res) => {
  TodoFavorites.find()
    .then((favoriteTodos) => res.send(favoriteTodos))
    .catch((err) => console.error(err.message));
})

router.get('/getone/:id', (req, res) => {
  TodoFavorites.findOne({ id: +req.params.id })
    .then((todo) => res.send(todo))
    .catch((err) => res.status(400).json(err));
})

router.post('/add', (req, res) => {
  const newTodoFavorite = new TodoFavorites(req.body)
  newTodoFavorite
    .save()
    .then((response) => res.json({ msg: 'add success' }))
    .catch((err) => res.status(400).json(err));
})

router.delete('/remove/:id', (req, res) => {
  TodoFavorites.findOneAndRemove({ id: +req.params.id })
    .then((result) => res.json({ msg: 'delete success' }))
    .catch((err) => res.status(400).json(err));
})

module.exports = router;