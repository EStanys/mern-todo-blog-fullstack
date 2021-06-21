const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoritesSchema = new Schema(
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

const TodoFavorites = mongoose.model('TodoFavorite', favoritesSchema);
module.exports = TodoFavorites