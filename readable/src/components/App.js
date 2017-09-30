import React, { Component } from 'react';
import '../App.css';
import { withRouter, Route } from 'react-router-dom';
import Categories from './Categories';
import PostDetail from './PostDetail';
import NewPost from './NewPost';
import PostEdit from './PostEdit';
import { connect } from 'react-redux';


class App extends Component {

  render() {
    return (
      <div className="App" >
        <h1 className="main-title">
          The Anonymous Medium
        </h1>
        <h6 className="main-sub-title">
          yet another place for internet trolls to congregate...
        </h6>
        <Route exact path="/"
          render={() => (
            <Categories filterCategory={['react','redux','udacity']}/>
          )}
        />
        <Route exact path="/react"
          render={() => (
            <Categories filterCategory={['react']}/>
          )}
        />
        <Route exact path="/redux"
          render={() => (
            <Categories filterCategory={['redux']}/>
          )}
        />
        <Route exact path="/udacity"
          render={() => (
            <Categories filterCategory={['udacity']}/>
          )}
        />
        <Route exact path="/posts/:category/:id"
          render={() => (
            <PostDetail />
          )}
        />
        <Route exact path="/post"
          render={() => (
            <NewPost />
          )}
        />
        <Route exact path="/edit/:id"
          render={() => (
            <PostEdit />
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allPosts: state.reducePosts.posts
  };
}

export default withRouter(connect(
  mapStateToProps,
  null
)(App));
