import React, { Component } from 'react';
import '../App.css';
import { withRouter, Route } from 'react-router-dom';
import Categories from './Categories';

class App extends Component {

  render() {
    console.log("Props", this.props);
    return (
      <div className="App" >
        <Route exact path='/'
          render={() => (
            <Categories filterCategory={['react','redux','udacity']}/>
          )}
        />
        <Route path="/react"
          render={() => (
            <Categories filterCategory={['react']}/>
          )}
        />
        <Route path="/redux"
          render={() => (
            <Categories filterCategory={['redux']}/>
          )}
        />
        <Route path="/udacity"
          render={() => (
            <Categories filterCategory={['udacity']}/>
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
