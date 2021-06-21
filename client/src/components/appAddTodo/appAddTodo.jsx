import React, { Component } from 'react';
import classes from './appAddTodo.module.css';

class AppAddTodo extends Component {
  state = {};
  render() {
    
    return (
      <div className={classes['add-todo-container']}>
        
        <i
          onClick={(e) => {
            this.props.onHandleAddTodo(e);
          }}
          className="fa fa-plus-circle fa-lg"
          aria-hidden="true"
        ></i>
        <input  placeholder="Add new to-do" />
      </div>
    );
  }
}

export default AppAddTodo;
