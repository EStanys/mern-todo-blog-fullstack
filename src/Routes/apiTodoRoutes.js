const express = require('express')
const router = express.Router()

const Todo = require('../models/todo')

router.get('/', (req, res) => {
  Todo
  .find()
  .then(todoList => res.send(todoList))
  .catch((err) => console.error(err.message))
})

router.post('/new', (req, res) => {
  const newTodo = new Todo(req.body)

  newTodo
    .save()
    .then((result) => res.json({ msg: 'add success' }))
    .catch((err) => res.status(400).json({ msg: 'add failed', err }));

});

router.delete('/delete/:id', (req, res) => {
    Todo.findOneAndRemove({ id: +req.params.id })
      .then((result) => res.json({ msg: 'delete success' }))
      .catch((err) => res.status(400).json(err));
});

router.put('/editDone/:id', (req, res) => {
  Todo.findOneAndUpdate({ id: +req.params.id }, { isDone: req.body.isDone })
    .then((result) => res.json({ msg: 'checkUncheck success' }))
    .catch((err) => res.status(400).json(err));
})

router.put('/edit/:id', (req, res) => {
  Todo.findOneAndUpdate({id: +req.params.id}, { isEditMode: req.body.isEditMode })
  .then(result => res.json({msg: 'editMode success'}))
  .catch((err) => res.status(400).json(err))
})

router.put('/editSave/:id', (req, res) => {
  Todo.findOneAndUpdate({id: +req.params.id}, {
    title: req.body.title,
    isEditMode: req.body.isEditMode
  })
  .then(result => res.json({msg: 'editSave success'}))
  .catch(err => res.status(400).json(err))
})

router.get('/reset', (req, res) => {
  Todo.deleteMany()
    .then((result) => res.json({ msg: 'reset success' }))
    .catch((err) => console.error(err.message));
});

// favorites

router.put('/favoriteIcon/:id', (req, res) => {
  Todo.findOneAndUpdate(
    { id: +req.params.id },
    {
      isInFavorites: req.body.isInFavorites,
    }
  )
    .then((result) => res.json({ msg: 'edit success' }))
    .catch((err) => res.status(400).json(err));
})



module.exports = router