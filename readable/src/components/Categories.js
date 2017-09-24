import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { withRouter, Link } from 'react-router-dom';
import { getAllCategories, getAllPosts, votePost, LATEST } from '../actions';
import { bindActionCreators } from 'redux';
import { getDate } from '../utils/helper';
import Vote from './Vote';
import Sort from './Sort';

class Categories extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  sortPosts() {
    const { allPosts } = this.props;

    if (allPosts) {
      if (this.props.sortValue.sortValue === LATEST) {
        allPosts.sort(function (a, b) {
          return b.timestamp - a.timestamp;
        });
      } else {
        allPosts.sort(function (a, b) {
          return b.voteScore - a.voteScore;
        });
      }
      return allPosts;
    }
  }

  showPosts() {
    const sortedPosts = this.sortPosts();

    return (
      sortedPosts && sortedPosts
        .filter( posts => posts.deleted === false) // filter deleted
        .filter( posts => this.props.filterCategory.includes(posts.category)) // filter category
        .map(posts => (
          <ul key={posts.id} className="post-id">
            <Vote voteData={{id: posts.id, item: 'post', score: posts.voteScore}}  classStyle="vote-post"/>
            <h3 className="post-title">
              <Link className="post-title" to={`/posts/${posts.id}`}>{posts.title}</Link>
            </h3>
            <div className="post-misc">
              Author: {posts.author}
              &nbsp;&nbsp;&nbsp;&nbsp; Category: {posts.category}
              &nbsp;&nbsp;&nbsp;&nbsp; Date: {getDate(posts.timestamp)}
            </div>
          </ul>
        ))
    );
  }

  render() {
    // console.log(this.props)
    return (
      <div className="App2" >
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
          <Sort sortProp={this.props.sortValue.sortValue} />
          <button className="btn-new-post"><Link className="link-new-post" to="/post">New Post</Link></button>
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
    votePost: votePost
  }, dispatch);
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories));
