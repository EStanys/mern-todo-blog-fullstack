import React, { Component } from 'react';
import classes from './blogPage.module.css';
import BlogList from '../../components/blogList/blogList';

export default class BlogPage extends Component {
   state = {
     blogsActive: true
   }

  componentDidMount = () => {
    console.log('yes');
     this.setState({ blogsActive: true });
  }

  render() {
    return (
      <section className={classes['blog-wrapper']}>
        <h2 className={classes['blog__header']}>Happy reading!</h2>
        <div className={classes['blog-container']}>
          {this.state.blogsActive && <BlogList />}
        </div>
      </section>
    );
  }
}
