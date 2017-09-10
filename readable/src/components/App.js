import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { getAllCategories, getAllPosts } from '../actions';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  showPosts() {
    const { allPosts } = this.props;

    return (
      allPosts && allPosts.map(posts => (
        <ul key={posts.id} className="post-id">
          <h3 className="post-title">
            {posts.title}
          </h3>
          <div className="post-body">
            {posts.body}
          </div>
          <div className="post-info">
            <div className="padding-stuff"></div>
              Auhor: {posts.author}
              &nbsp;&nbsp;&nbsp;&nbsp; Category: {posts.category}
              &nbsp;&nbsp;&nbsp;&nbsp; Score: {posts.voteScore}
          </div>

        </ul>
      ))
    );
  }

  render() {
    // const { allPosts } = this.props;
    console.log("Props", this.props);
    return (
      <div className="App" >
        <h1 className="main-title">
            Welcome to Anonymous Posts
        </h1>
        <div className="Posts">
          {this.showPosts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, { allPosts }) {
  return {
    mapCategories: state.reduceCategories.categories,
    allPosts: state.reducePosts.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCategories: getAllCategories,
    fetchPosts: getAllPosts,
  }, dispatch);
}

// Can also call dispatch directly. Do not need to call this.props.fetchCategories() above.
// function mapDispatchToProps(dispatch) {
//   return {
//     fetchCategories: dispatch(getAllCategories()),
//     fetchPosts: dispatch(getAllPosts()),
//   };
// }


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
