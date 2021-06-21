import React, { Component } from 'react';
import classes from './navBarDropDown.module.css';
import { Link } from 'react-router-dom';
import DropDownItems from './dropDownItems'

class NavBarDropDown extends Component {
  state = {
    visible: true,
  };

  visibilityHandler = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    return (
      <ul
        className={this.state.visible ? classes.dropdown : `${classes.dropdown} ${classes['dropdown-invisible']}`}
        onClick={this.visibilityHandler}
      >
        {DropDownItems.map(({ title, path, cName }) => (
          <li key={Math.random()}>
            <Link onClick={this.props.onHandleVisibility} to={path} className={classes[cName]}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default NavBarDropDown;
