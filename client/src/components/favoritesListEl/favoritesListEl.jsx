import React, { Component } from 'react'
import classes from "./favoritesListEL.module.css" 

class FavoritesListEl extends Component {
  

  state={
    eVal: ''
  }

  render() {
    const {
      todo: { title, id },
    } = this.props;

    return (
      <li className={this.props.className}>
        {this.props.todoDuplicate &&
          this.state.eVal === title && (<p className={classes['err-duplicate']}>Already in the list</p>)}
        
        {!this.props.todoDuplicate &&
          this.state.eVal === title && (<p className={classes['scs-duplicate']}>Successfully added to the list</p>)}

        {title}
        <div>
          <i
            onClick={(e) => {
              
              this.props.onHandleAddTodoFromFavorites(id);
              setTimeout(() => this.setState({eVal: e.target.parentElement.previousSibling.textContent}), 200);
              
              setTimeout(() => (this.setState({eVal: ''}) ), 2000);
            }}
            className={`${classes['add-input']} fa fa-plus-circle fa-sm`}
            aria-hidden="true"
          ></i>
          <i
            style={{ color: 'rgb(195, 14, 14)', cursor: 'pointer' }}
            className="fa fa-trash"
            onClick={() => {
              this.props.onHandleFavoriteDelete(id);
            }}
          ></i>
        </div>
      </li>
    );
  }
}

export default FavoritesListEl;