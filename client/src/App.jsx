import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import TodoPage from './components/todoPage/todoPage'
import NavBar from './components/navBar/navBar'
import ContactsPage from './pages/contacts'
import AboutPage from './pages/about'
import HomePage from './pages/home'
import SingleTodo from './pages/singleTodo'
import NotFound from './pages/404'
import BlogPage from './pages/blogPage/blogPage'
import BlogPageNew from './pages/blogPageNew/blogPageNew'
import BlogPageSingle from './pages/blogPageSingle/blogPageSingle'
import BlogPageEdit from './pages/blogPageEdit/blogPageEdit'

// app styles
import classes from './app.module.css';

class App extends Component{
  state ={}
  render() {
    return (
      <div className={classes.App}>
        <NavBar />
        <div className={classes.container}>
          <Switch>
            <Route path="/todos/:id" component={SingleTodo}></Route>
            <Route path="/todos" component={TodoPage}></Route>
            <Route path="/about" component={AboutPage}></Route>
            <Route path="/contacts" component={ContactsPage}></Route>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/not-found" exact component={NotFound}></Route>

            {/* blog dropdown */}
            <Route path="/blog/new" component={BlogPageNew}></Route>
            <Route path="/blog/single/edit/:id" component={BlogPageEdit}></Route>
            <Route path="/blog/single/:id" component={BlogPageSingle}></Route>
            <Route path="/blog" component={BlogPage}></Route>

            {/* not found */}
            <Redirect to="/not-found"></Redirect>
          </Switch>

          {/* <Route path="/" exact component={HomePage}></Route> */}
        </div>
      </div>
    );
  }
}

export default App