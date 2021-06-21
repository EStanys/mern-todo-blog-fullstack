import React, { Component } from 'react'
import classes from './navBar.module.css'
import { Link } from 'react-router-dom'
import NavBarDropDown from '../navBarDropDown/navBarDropDown'

class NavBar extends Component {
  state = {
    dropdown: false,
  };

  blogOnMouseEnter = () => {
    this.setState({dropdown: true})
  }
  blogOnMouseLeave = () => {
    this.setState({dropdown: false})
  }

  handleVisibility = () => {
    this.setState({ dropdown: false })
  }
  render() {
    return (
      <nav className={classes.navbar}>
        <li className={classes['nav__logo']}>
          <Link to="/">ReactApp</Link>
        </li>
        <ul className={classes['nav__links']}>
          <li className={classes['nav__link']}>
            <Link to="/">Home</Link>
          </li>

          <li className={classes['nav__link']}>
            <Link to="/todos">To-do</Link>
          </li>

          <li
            style={{ position: 'relative' }}
            className={classes['nav__link']}
            onMouseEnter={this.blogOnMouseEnter}
            onMouseLeave={this.blogOnMouseLeave}
          >
            <Link className={classes['nav-blog__link']} to="#" onClick={this.blogOnMouseEnter}>
              Blog
              <i className="fa fa-caret-down" style={{ paddingLeft: '3px' }} aria-hidden="true"></i>
            </Link>
            {this.state.dropdown && <NavBarDropDown onHandleVisibility={this.handleVisibility} />}
          </li>

          <li className={classes['nav__link']}>
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar