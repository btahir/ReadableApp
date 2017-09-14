import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { withRouter, Link } from 'react-router-dom';
import { getAllPosts } from '../actions';
import { bindActionCreators } from 'redux';

class Posts extends Component {

  render () {
    console.log("Posts-Props", this.props.match.params.id);
    return (
      <div>Hello World
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allPosts: state.reducePosts.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPosts: getAllPosts
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts));