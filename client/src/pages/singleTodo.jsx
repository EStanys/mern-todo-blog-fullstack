import React, { Component } from 'react';

class SingleTodo extends Component {
  render() {
    return <h1>SingleTodo page - {this.props.match.params.id}</h1>;
  }
}

export default SingleTodo;
