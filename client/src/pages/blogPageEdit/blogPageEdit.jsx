import React, { Component, Fragment } from 'react';
import Button from '../../components/appButton/appButton';
import classes from './blogPageEdit.module.css';
import { Link } from 'react-router-dom'

export default class BlogPageNew extends Component {
  constructor() {
    super();
    this.blogUrl = 'http://localhost:3001/api/blog';
    this.state = {
      formData: { title: '', author: '', postText: '' },
    };
  }

  componentDidMount = async () => {
    const resp = await fetch(`${this.blogUrl}/single/${this.props.match.params.id}`);
    const data = await resp.json();
    if (data.msg === 'get one success') this.setState({ formData: data.onePost });
  }

  formInputHandler = (event) => {
    const formDataCopy = { ...this.state.formData };
    formDataCopy[event.target.name] = event.target.value;
    this.setState({
      formData: formDataCopy,
    });
  };

  saveBlogPost = async (event) => {
    event.preventDefault();
    const formDataCopy = { ...this.state.formData };

    try {
      const resp = await fetch(`${this.blogUrl}/single/edit/${this.props.match.params.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formDataCopy),
      });
      const data = await resp.json();
      data.msg === 'edit success' && this.setState({ formData: { title: '', author: '', postText: '' } });
      data.msg === 'edit success' && this.props.history.push(`/blog/single/${this.props.match.params.id}`);

      
    } catch (err) {
      console.log('saveBlogPost err', err);
    }
  };


  render() {
    return (
      <section className={classes['add-blog-wrapper']}>
        <h2 className={classes['add-blog__header']}>Edit Blog post</h2>

        <form onSubmit={this.saveBlogPost} className={classes['add-blog__form']}>
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
              Save post
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
