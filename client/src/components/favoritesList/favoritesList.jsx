import React, { Component, Fragment } from 'react'
import classes from './favoritesList.module.css'
import AppButton from '../appButton/appButton'
import FavoritesListEl from '../favoritesListEl/favoritesListEl'

class FavoritesList extends Component {
  state={
    closed: false
  }

  render() {
    return (
      <Fragment>
        <div
          onClick={() => {
            this.setState({ closed: true });
            setTimeout(() => {
              this.props.onFavoritesVisibilityHandler(); 
              this.setState({ closed: false })}, 500);
          }}
          classs={classes['favorites-btn']}
          className={classes['favorites-backdrop']}
        ></div>
        <ul
          className={
            this.state.closed
              ? `${classes['favorites-container']} ${classes['favorites-container__close']}`
              : classes['favorites-container']
          }
        >
          <div>
            <h2>Favorites</h2>
            {this.props.favorites.map((todo) => (
              <FavoritesListEl
                todo={todo}
                key={todo.id}
                className={classes['favorites__list-item']}
                onHandleFavoriteDelete={this.props.onHandleFavoriteDelete}
                onHandleAddTodoFromFavorites={this.props.onHandleAddTodoFromFavorites}
                todoDuplicate={this.props.todoDuplicate}
                idDuplicate={todo.id}
              />
            ))}
          </div>
          

          <AppButton
            callback={() => {
              this.setState({ closed: true });
              setTimeout(() => this.props.onFavoritesVisibilityHandler(), 500);
            }}
            classs={classes['favorites-btn']}
          >
            Close
          </AppButton>
        </ul>
      </Fragment>
    );
    
  }
}

export default FavoritesList;