import React, { Component } from 'react';
// import style
import classes from './appHeader.module.css';
// add image
import jdiImg from '../../images/jdi.jpeg';

class AppHeader extends Component {
  state = {};
  
  getDate = () => {
    const now = new Date()
    return now.toLocaleDateString()
  }


  render() {
    return (
      <header>
        <img className={classes['hero']} src={jdiImg} alt="Very nice view of a sky" />
        <p className={classes['hero-date']}>{this.getDate()}</p>
      </header>
    );
  }
}

export default AppHeader;
