const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
},
{timestamps: true}
);

const BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = BlogPost