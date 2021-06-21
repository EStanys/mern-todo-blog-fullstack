import React, { Component } from 'react';
import classes from './blogPageSingle.module.css';
import Button from '../../components/appButton/appButton'


export default class BlogPageSingle extends Component {
  constructor() {
    super();
    this.blogUrl = 'http://localhost:3001/api/blog';
    this.state = {
      singleBlog: {},
    };
  }

  componentDidMount = async () => {
    const resp = await fetch(`${this.blogUrl}/single/${this.props.match.params.id}`);
    const data = await resp.json();
    if (data.msg === 'get one success') this.setState({ singleBlog: data.onePost });
  };

  deleteBlogPostHandler = async () => {
    const resp = await fetch(`${this.blogUrl}/single/delete/${this.props.match.params.id}`, {
      method: 'delete',
    });
    const data = await resp.json();
    if (data.msg === 'delete success') this.props.history.push(`/blog`);
  };

  editBlogPostHandler = () => {
    this.props.history.push(`/blog/single/edit/${this.props.match.params.id}`);
  };
  backToBlogsHandler = () => {
    this.props.history.push('/blog')
  }

  render() {
    const imgLink = `https://picsum.photos/seed/${Math.random()}/600/250`;

    const { author, title, postText, _id } = this.state.singleBlog;

    return (
      <div className={classes.wrapper}>
        <section className={classes['single-post-wrapper']}>
          <h2 className={classes['single-post__header']}>Happy reading!</h2>
          <div className={classes['single-post__container']}>
            <img src={imgLink} alt="" />
            <h2>{title}</h2>
            <p>
              Author: <strong>{author}</strong>
            </p>
            <p>{postText}</p>
            <div className={classes['single-post-btns']}>
              <Button
                callback={() => {
                  this.editBlogPostHandler();
                }}
                background="#F0D24F"
                color="#2c2c2c"
                width="25%"
              >
                Edit
              </Button>

              <Button
                callback={() => {
                  this.deleteBlogPostHandler();
                }}
                background="#FB817D"
                color="#2c2c2c"
                width="25%"
              >
                Delete
              </Button>

              <Button
                callback={() => {
                  this.backToBlogsHandler();
                }}
                background="#3CB371"
                color="#2c2c2c"
                width="25%"
              >
                Back to Blogs
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


