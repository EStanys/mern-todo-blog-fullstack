import React, { Component } from 'react'
import classes from './appListEl.module.css';

class AppListEl extends Component {

    render(){
        const {
          todo: { title, isDone, isEditMode, id, isInFavorites },
        } = this.props;

       return (
         <li className={classes['app-todo-el']}>
           <i
             className={isDone ? 'fa fa-check-circle' : 'fa fa-circle-thin'}
             onClick={() => {
               this.props.onHandleCheckUncheck(id, isDone);
             }}
           ></i>

           {/* Title */}

           {isEditMode ? (
             <input defaultValue={title}></input>
           ) : (
             <span className={isDone ? classes.crossed : ''}>{title}</span>
           )}

           {/* Edit/save edit */}

           {isEditMode ? (
             <i
               className="fa fa-floppy-o"
               aria-hidden="true"
               onClick={(e) => {
                 this.props.onHandleEditSave(id, isEditMode, e);
               }}
             ></i>
           ) : (
             <i
               className="fa fa-pencil"
               onClick={() => {
                 this.props.onHandleEdit(id, isEditMode);
               }}
             ></i>
           )}

           {/* Favourites */}

           {isInFavorites ? (
             <i
               onClick={(e) => {
                 this.props.onRemoveFromFavouritesHandler(id, isInFavorites, e);
               }}
               className="fa fa-star"
               aria-hidden="true"
             ></i>
           ) : (
             <i
               onClick={(e) => {
                 this.props.onAddToFavouritesHandler(id, isInFavorites, e);
               }}
               className="fa fa-star-o"
               aria-hidden="true"
             ></i>
           )}

           {/* Delete */}

           <i
             className="fa fa-trash"
             onClick={() => {
               this.props.onHandleDelete(id);
             }}
           ></i>
         </li>
       );
    }
}

export default AppListEl;