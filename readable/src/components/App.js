import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { getAllCategories, getAllPosts, sortLatest, sortPopular } from '../actions';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  sortPosts() {
    const { allPosts } = this.props;
    const { sortValue } = this.props;

    if (allPosts && sortValue.sortValue === 'POPULAR_POST') {
      allPosts.sort(post => 
        post.voteScore
      ).reverse();
    } else if (allPosts && sortValue.sortValue === 'LATEST_POST') {
      allPosts.sort(post => 
        post.timestamp
      ).reverse();
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

  // handlePopularClick() {
  //   let { sortValue } = this.props;
  //   sortValue = 'voteScore';
  // }


  render() {
    // const { allPosts } = this.props;
    console.log("Props", this.props);
    return (
      <div className="App" >
        <h1 className="main-title">
            Welcome to Anonymous Posts
        </h1>
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

function mapStateToProps(state, { allPosts }) {
  return {
    mapCategories: state.reduceCategories.categories,
    allPosts: state.reducePosts.posts,
    sortValue: state.sortValue,
    // sortValue: state.sortValue,
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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
