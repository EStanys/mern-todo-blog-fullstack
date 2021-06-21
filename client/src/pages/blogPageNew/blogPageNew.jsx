import React, { Component, Fragment } from 'react';
import Button from '../../components/appButton/appButton';
import classes from './blogPageNew.module.css';
import { Link } from 'react-router-dom'

export default class BlogPageNew extends Component {
  constructor() {
    super();
    this.blogUrl = 'http://localhost:3001/api/blog';
    this.state = {
      formData: { title: '', author: '', postText: '' },
    };
  }

  formInputHandler = (event) => {
    const formDataCopy = { ...this.state.formData };
    formDataCopy[event.target.name] = event.target.value;
    this.setState({
      formData: formDataCopy,
    });
  };

  addNewBlogPost = async (event) => {
    event.preventDefault();
    const formDataCopy = { ...this.state.formData };

    try {
      const resp = await fetch(`${this.blogUrl}/new`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formDataCopy),
      });
      const data = await resp.json();
      data.msg === 'add success' && this.setState({ formData: { title: '', author: '', postText: '' } });

      console.log('front msg:', data.msg);
    } catch (err) {
      console.log('addNewBlogPost err', err);
    }
  };


  render() {
    return (
      <section className={classes['add-blog-wrapper']}>
        <h2 className={classes['add-blog__header']}>Add new Blog post</h2>

        <form onSubmit={this.addNewBlogPost} className={classes['add-blog__form']}>
          <label className={classes['add-blog__title']} htmlFor="title">
            Post Title
          </label>
          <input
            onChange={this.formInputHandler}
            className={classes['add-blog__input']}
            type="text"
            name="title"
            placeholder="Enter title"
            id="title"
            value={this.state.formData.title}
          />

          <label className={classes['add-blog__title']} htmlFor="title">
            Author
          </label>
          <input
            onChange={this.formInputHandler}
            className={classes['add-blog__input']}
            type="text"
            name="author"
            placeholder="Enter author"
            id="title"
            value={this.state.formData.author}
          />

          <label className={classes['add-blog__title']} htmlFor="title">
            Post Text
          </label>
          <textarea
            onChange={this.formInputHandler}
            className={classes['add-blog__text-area']}
            type="text"
            name="postText"
            placeholder="Enter post text"
            id="title"
            rows="5"
            value={this.state.formData.postText}
          />

          <div>
            <Button type="submit" className={classes['add-blog__btn']} background="#3CB371" color="#2c2c2c" width="25%">
              Add post
            </Button>

            <Link className={classes['add-blog__redirect-link']} to="/blog">
              Back to Blogs
            </Link>
          </div>
        </form>
      </section>
    );
  }
}
