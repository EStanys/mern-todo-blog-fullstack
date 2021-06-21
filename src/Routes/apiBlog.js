const express = require('express');
const router = express.Router();

const BlogPost = require('../models/blog');

router.post('/new', async (req, res) => {
  const newBlogPost = new BlogPost(req.body);
try{ 
  const blog = await newBlogPost.save()
  res.json({ msg: 'add success' })

} catch (err) {
  res.status(400).json(err)
}
});

router.get('/', (req, res) => {
  BlogPost.find()
    .then((allPosts) => res.json({ allPosts, msg: 'get success' }))
    .catch((err) => res.status(400).json(err));
});

router.get('/single/:id', (req, res) => {
  BlogPost.findById(req.params.id)
    .then((onePost) => res.json({ onePost, msg: 'get one success' }))
    .catch((err) => res.status(400).json(err));
});

router.delete('/single/delete/:id', (req, res) => {
  BlogPost.findByIdAndDelete(req.params.id)
    .then((result) => res.json({ msg: 'delete success' }))
    .catch((err) => res.status(400).json(err));
});

router.put('/single/edit/:id', (req, res) => {
  BlogPost.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => res.json({ msg: 'edit success' }))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
