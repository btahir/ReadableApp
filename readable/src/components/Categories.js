import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { withRouter, Link } from 'react-router-dom';
import { getAllCategories, getAllPosts, sortLatest, sortPopular } from '../actions';
import { bindActionCreators } from 'redux';

class Categories extends Component {
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
      sortedPosts && sortedPosts
        .filter( posts => this.props.filterCategory.includes(posts.category)) // filter category
        .map(posts => (
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
    return (
      <div className="App" >
        <h1 className="main-title">
            Welcome to Anonymous Posts
        </h1>
        <div className="nav-bar">
          <ul className="nav-list">
            <li><Link className="nav-item" to="/">All</Link></li>
            <li><Link className="nav-item" to="/react">React</Link></li>
            <li><Link className="nav-item" to="/redux">Redux</Link></li>
            <li><Link className="nav-item" to="/udacity">Udacity</Link></li>
          </ul>
          <hr/>
        </div>
        <div className="sort-buttons">
          <button onClick={this.props.sortPopular} className="btn-popular">Popular</button>
          <button onClick={this.props.sortLatest} className="btn-latest">Latest</button>
        </div>
        <div className="Posts">
          {this.showPosts()}
        </div>
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
    sortPopular: sortPopular
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories));
