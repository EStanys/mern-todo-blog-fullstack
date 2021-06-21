import React, { Component } from 'react';
import AppHeader from '../appHeader/appHeader';
import AppList from '../appList/appList';
import AppAddTodo from '../appAddTodo/appAddTodo';
import AppButton from '../appButton/appButton';
import FavoritesList from '../favoritesList/favoritesList';

import classes from './todoPage.module.css';

class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.handleCheckUncheck = this.handleCheckUncheck.bind(this);
    this.todoUrl = 'http://localhost:3001/api/todo';
    this.favoritesUrl = 'http://localhost:3001/api/todo/favorites';
  }

  state = {
    todos: [],
    favorites: [],
    favoritesVisible: false,
    inputIsEmpty: false,
    todoDuplicate: false,
    errors: {
      addTodo: '',
    },
  };

  // Mount / Update

  async componentDidMount() {
    const response = await fetch(this.todoUrl);
    const data = await response.json();

    const favoritesResponse = await fetch(this.favoritesUrl);
    const favoritesData = await favoritesResponse.json();

    this.setState({
      todos: data,
      favorites: favoritesData,
      inputIsEmpty: false,
      favoritesVisible: false,
    });
  }

  updateState = async () => {
    const response = await fetch(this.todoUrl);
    const data = await response.json();

    const favoritesResponse = await fetch(this.favoritesUrl);
    const favoritesData = await favoritesResponse.json();

    this.setState({ todos: data, favorites: favoritesData });
  };

  // Add

  handleAddTodo = async (e) => {
    let inputValue = e.target.nextSibling.value;
    e.target.nextSibling.value = '';

    if (inputValue === '') {
      this.setState({ inputIsEmpty: true });
      return;
    }
    try {
      const response = await fetch(`${this.todoUrl}/new`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: Math.random(),
          isDone: false,
          title: inputValue,
          isEditMode: false,
          isInFavorites: false,
        }),
      });
      const data = await response.json();

      this.setState({ inputIsEmpty: false });

      if (data.msg === 'add success') {
        this.updateState();
      }
      if (data.msg === 'add failed') {
        this.setState({ inputIsEmpty: true });
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  // Delete

  handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3001/api/todo/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await response.json();

    if (data.msg === 'delete success') {
      this.updateState();
    }
  };

  // Check / uncheck

  handleCheckUncheck = async (id, isDone) => {
    const response = await fetch(this.todoUrl + `/editDone/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ isDone: !isDone }),
    });
    const data = await response.json();

    if (data.msg === 'checkUncheck success') {
      this.updateState();
    }
  };

  // Edit

  handleEdit = async (id, isEditMode) => {
    const response = await fetch(this.todoUrl + `/edit/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ isEditMode: !isEditMode }),
    });
    const data = await response.json();

    if (data.msg === 'editMode success') {
      this.updateState();
    }
  };

  handleEditSave = async (id, isEditMode, e) => {
    const response = await fetch(this.todoUrl + `/editSave/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: e.target.previousSibling.value,
        isEditMode: !isEditMode,
      }),
    });
    const data = await response.json();

    if (data.msg === 'editSave success') {
      this.updateState();
    }
  };

  // Reset

  resetTodoList = async () => {
    const response = await fetch(this.todoUrl + '/reset');
    const data = await response.json();

    if (data.msg === 'reset success') {
      this.updateState();
      this.setState({ inputIsEmpty: false });
    }
  };

  // Favorites

  addToFavouritesHandler = async (id, isInFavorites, e) => {
    const response = await fetch(this.favoritesUrl + '/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        isDone: false,
        title: e.target.previousSibling.previousSibling.textContent,
        isEditMode: false,
        isInFavorites: true,
      }),
    });
    const data = await response.json();

    if (data.msg === 'add success') {
      const response = await fetch(this.todoUrl + `/favoriteIcon/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ isInFavorites: !isInFavorites }),
      });

      this.updateState();
    }
    
  };

  removeFromFavouritesHandlerApp = async (id, isInFavorites, e) => {
    const response = await fetch(this.favoritesUrl + `/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await response.json();

    if (data.msg === 'delete success') {
      const response = await fetch(this.todoUrl + `/favoriteIcon/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ isInFavorites: !isInFavorites }),
      });
      if (data.msg === 'delete success') this.updateState();
    }
  };

  removeFromFavouritesHandlerFav = async (id, isInFavorites, e) => {
    const response = await fetch(this.favoritesUrl + `/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await response.json();

    if (data.msg === 'delete success') {
      const response = await fetch(this.todoUrl + `/favoriteIcon/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ isInFavorites: isInFavorites }),
      });
      if (data.msg === 'delete success') this.updateState();
    }
  };

  handleAddTodoFromFavorites = async (id) => {
    const response = await fetch(this.favoritesUrl + `/getone/${id}`);
    const data = await response.json();

    let sameTodo = this.state.todos.find((todo) => todo.id === data.id);

    if (sameTodo === undefined) {
      const postResponse = await fetch(`${this.todoUrl}/new`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const postdata = await postResponse.json();

      if (postdata.msg === 'add success') {
        this.updateState();
        this.setState({ todoDuplicate: false });
      }
    } else {
      this.setState({ todoDuplicate: true });
      setTimeout(() => this.setState({ todoDuplicate: false }), 2100);
    }
  };

  favoritesVisibilityHandler = () => {
    this.setState({ favoritesVisible: !this.state.favoritesVisible });
  };

  // Render

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.todoPage}>
          {this.state.favoritesVisible && (
            <FavoritesList
              todoDuplicate={this.state.todoDuplicate}
              onHandleAddTodoFromFavorites={this.handleAddTodoFromFavorites}
              onHandleFavoriteDelete={this.removeFromFavouritesHandlerFav}
              onFavoritesVisibilityHandler={this.favoritesVisibilityHandler}
              favorites={this.state.favorites}
            />
          )}

          <AppHeader />
          {this.state.todos.length === 0 && <h4 className={classes.emptyList}>There is no todos</h4>}

          <AppList
            onRemoveFromFavouritesHandler={this.removeFromFavouritesHandlerApp}
            onAddToFavouritesHandler={this.addToFavouritesHandler}
            onHandleEditSave={this.handleEditSave}
            onHandleEdit={this.handleEdit}
            onHandleDelete={this.handleDelete}
            onHandleCheckUncheck={this.handleCheckUncheck}
            todos={this.state.todos}
          />

          <div className={classes['bottom-row']}>
            <AppAddTodo
              // inputIsEmpty={this.state.inputIsEmpty && this.state.inputIsEmpty}
              onHandleAddTodo={this.handleAddTodo}
            />

            <div>
              <AppButton callback={this.favoritesVisibilityHandler} background="#F0D24F" color="#2c2c2c">
                Favorites
              </AppButton>
              <AppButton background="#FB817D" color="#2c2c2c" callback={this.resetTodoList}>
                Reset
              </AppButton>
            </div>
          </div>
          {this.state.inputIsEmpty && <p className={classes['input-empty-err']}>*required field</p>}
        </div>
      </div>
    );
  }
}

export default TodoPage;
