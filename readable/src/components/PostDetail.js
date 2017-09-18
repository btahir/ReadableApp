import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOnePost, getComments, deletePost } from '../actions';

class PostDetail extends Component {

  // componentDidMount() {
  //   const deleted_post = false;
  // }

  getDate(unix_timestamp) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp);

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return month + '/' + day + '/' + year;
  }

  showContent(item) {
    let post_or_comment = '';

    if(item) {
      if(item.category) {
        post_or_comment = 'post-body';
      } else {
        post_or_comment = 'comment-body';
      }

      return (
        <div key={item.id}>
          <div className="post-title">
            {item.title}
          </div>
          <div className={post_or_comment}>
            {item.body}
          </div>
          <div className="post-misc">
            <div className="padding-stuff" />
              Author: {item.author}
              &nbsp;&nbsp;&nbsp;&nbsp; Category: {item.category}
              &nbsp;&nbsp;&nbsp;&nbsp; Score: {item.voteScore}
              &nbsp;&nbsp;&nbsp;&nbsp; Date: {this.getDate(item.timestamp)}
          </div>
        </div>
      );
    }

  }

  showPost() {
    const post = this.props.getPost;
    return (
      <div className="post-content"> 
        {this.showContent(post)}
      </div>
    );
  }

  delPost(id) {
    this.props.deletePost(id);
    this.props.history.push('/');
  }

  showComment() {
    const comments = this.props.getComments;
    return (
      <div className="comment-content"> 
        {comments && comments.map(comment => this.showContent(comment))}
      </div>
    );
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <button onClick={this.props.sortPopular} className="btn-popular">Edit</button>
          <button onClick={() => {this.delPost(this.props.match.params.id)} } className="btn-latest">Delete</button>
        </div>
        <div className="post-position">{this.showPost()}</div>
        <div className="comment-position">Comments<hr /></div>
        <div className="post-position">{this.showComment()}</div>
      </div>
    );
  }

}

function mapStateToProps (state) {
  return {
    getPost: state.reducePosts.postDetail,
    getComments: state.reducePosts.comments
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatchPost: dispatch(getOnePost(ownProps.match.params.id)),
    dispatchComments: dispatch(getComments(ownProps.match.params.id)),
    deletePost: () => dispatch(deletePost(ownProps.match.params.id))
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail));