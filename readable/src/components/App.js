import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { withRouter, Route, Link } from 'react-router-dom';
import { getAllCategories, getAllPosts, sortLatest, sortPopular } from '../actions';
import { bindActionCreators } from 'redux';
import Categories from './Categories';

class App extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  sortPosts() {
    const { allPosts } = this.props;
    const { sortValue } = this.props;

    if (allPosts) {
      if (sortValue.sortValue === 'LATEST_POST') {
        allPosts.sort(post => 
          post.timestamp
        );
      } else {
        allPosts.sort(post => 
          post.voteScore
        ).reverse();      
      }
    }
    return allPosts;
  }

  showPosts() {
    const sortedPosts = this.sortPosts();

    return (
      sortedPosts && sortedPosts.map(posts => (
        <ul key={posts.id} className="post-id">
          <h3 className="post-title">
            {posts.title}
          </h3>
          <div className="post-body">
            {posts.body}
          </div>
          <div className="post-info">
            <div className="padding-stuff" />
              Author: {posts.author}
              &nbsp;&nbsp;&nbsp;&nbsp; Category: {posts.category}
              &nbsp;&nbsp;&nbsp;&nbsp; Score: {posts.voteScore}
          </div>

        </ul>
      ))
    );
  }

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

function mapStateToProps(state) {
  return {
    mapCategories: state.reduceCategories.categories,
    allPosts: state.reducePosts.posts,
    sortValue: state.sortValue
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCategories: getAllCategories,
    fetchPosts: getAllPosts,
    sortLatest: sortLatest,
    sortPopular: sortPopular,
  }, dispatch);
}

// Can also call dispatch directly. Do not need to call this.props.fetchCategories() above.
// function mapDispatchToProps(dispatch) {
//   return {
//     fetchCategories: dispatch(getAllCategories()),
//     fetchPosts: dispatch(getAllPosts()),
//   };
// }


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
