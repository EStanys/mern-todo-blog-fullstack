import React, { Component } from 'react';
import classes from './blogList.module.css';
import BlogListEl from '../blogListEl/blogListEl';

class BlogList extends Component {
  constructor() {
    super();
    this.blogUrl = 'http://localhost:3001/api/blog';
    this.state = {
      allPosts: [],
    };
  }

  componentDidMount = async () => {
    const resp = await fetch(this.blogUrl);
    const data = await resp.json();
    this.setState({ allPosts: data.allPosts });
    console.log(' this.state.allPosts:', this.state.allPosts);
  };

  readMoreHandler = async (id) => {
    console.log('id', id);
  }

  render() {
    return (
      <ul className={classes['blog-list']}>
        {this.state.allPosts.map((b) => (
          <BlogListEl
            onReadMoreHandler={this.readMoreHandler}
            key={b._id}
            onePost={b}
            imgLink={`https://picsum.photos/seed/${Math.random()}/300/200`}
          />
        ))}
      </ul>
    );
  }
}

export default BlogList;
