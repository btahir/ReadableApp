import React, { Component } from 'react';
import './App.css';
import * as API from './utils/api';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: 'ss',
    }
  }
  // retrieve all categories
  componentDidMount() {
    API.getCategories().then(category => this.setState({
      category,
    }))

  }

  render() {
    return (
      <div className="App">
      {this.state.category}
      </div>
    );
  }
}

export default App;
