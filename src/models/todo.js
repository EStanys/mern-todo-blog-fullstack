const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isEditMode: {
      type: Boolean,
      required: true,
    },
    isInFavorites: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('todo', todoSchema)
module.exports = Todo