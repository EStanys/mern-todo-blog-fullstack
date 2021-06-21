import React, { Component } from 'react';
import classes from './appList.module.css';
import AppListEl from '../appListEl/appListEl'

class AppList extends Component {
  state = {};
  render() {
    return (
      <ul className={classes['todo-list']}>
        {this.props.todos.map((t) => (
          <AppListEl
            onRemoveFromFavouritesHandler={this.props.onRemoveFromFavouritesHandler}
            onAddToFavouritesHandler={this.props.onAddToFavouritesHandler}
            onHandleEditSave={this.props.onHandleEditSave}
            onHandleEdit={this.props.onHandleEdit}
            onHandleDelete={this.props.onHandleDelete}
            onHandleCheckUncheck={this.props.onHandleCheckUncheck}
            key={t.id}
            todo={t}
          />
        ))}
      </ul>
    );
  }
}

export default AppList;
