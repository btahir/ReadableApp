import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { withRouter, Link } from 'react-router-dom';
import { getAllPosts, votePost, deletePost } from '../actions/PostAction';
import { getAllCategories } from '../actions/CategoriesAction';
import { bindActionCreators } from 'redux';
import { getDate, sortItems } from '../utils/helper';
import Vote from './Vote';
import Sort from './Sort';

class Categories extends Component {

  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  countComments(id) {
    const comments = this.props.getpostComments;

    return comments.filter(comment => comment.parentId === id).length;
  }

  showPosts() {
    const sortedPosts = sortItems(this.props.allPosts, this.props.sortValue.sortValue);

    return (
      sortedPosts && sortedPosts
        .filter( posts => posts.deleted === false) // filter deleted
        .filter( posts => this.props.filterCategory.includes(posts.category)) // filter category
        .map(posts => (
          <ul key={posts.id} className="post-id">
            <Vote voteData={{id: posts.id, item: 'post', score: posts.voteScore}}  classStyle="vote-post"/>
            <h3 className="post-title">
              <Link className="post-title" to={`/posts/${posts.category}/${posts.id}`}>{posts.title}</Link>
            </h3>
            <div className="div-delete">
              <button className="btn-delete"><Link className="link-new-post" to={`/edit/${posts.id}`}>Edit</Link></button>
              <button className="btn-new-post" onClick={() => {this.props.deletePost(posts.id);}}>Delete</button>
            </div>
            <div className="post-misc">
              Author: {posts.author}
              &nbsp;&nbsp;&nbsp;&nbsp; Category: {posts.category}
              &nbsp;&nbsp;&nbsp;&nbsp; Date: {getDate(posts.timestamp)}
              &nbsp;&nbsp;&nbsp;&nbsp; Comments: {this.countComments(posts.id)}
            </div>
          </ul>
        ))
    );
  }

  render() {
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
    getpostComments: state.reducePosts.comments,
    sortValue: state.sortValue
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCategories: getAllCategories,
    fetchPosts: getAllPosts,
    votePost: votePost,
    deletePost: (id) => deletePost(id),
  }, dispatch);
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories));
