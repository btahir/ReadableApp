import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOnePost, getComments, deletePost, addComment, toggleModal, commentBodyModal, commentAuthorModal } from '../actions';
import Modal from './Modal';
import { getDate } from '../utils/helper';

class PostDetail extends Component {

  getUUID() {
    return Math.floor((1 + Math.random()) * 0x1000000000000)
      .toString(16);
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
              &nbsp;&nbsp;&nbsp;&nbsp; Date: {getDate(item.timestamp)}
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

  captureCommentBody(event) {
    this.props.addCommentBody(event);
  }

  captureCommentAuthor(event) {
    this.props.addCommentAuthor(event);
  }

  newComment(comment, author) {

    const uuid = this.getUUID();

    const comment_data = {
      id: uuid,
      timestamp: Date.now(),
      body: comment,
      author: author,
      parentId: this.props.match.params.id
    };

    this.props.postComment(comment_data);
    this.props.toggleModal();
    window.location.reload();
  }

  render() {

    // console.log(this.props)
    return (
      <div>
        <div>
          <button onClick={() => {this.props.history.push('/')} } className="btn-popular">Back</button>
          <button className="btn-latest"><Link className="link-new-post" to={`/posts/edit/${this.props.match.params.id}`}>Edit</Link></button>
          <button onClick={() => {this.delPost(this.props.match.params.id)} } className="btn-latest">Delete</button>
        </div>
        <div className="post-position">{this.showPost()}</div>
        <div className="comment-position">Comments</div>
        <button onClick={() => {this.props.toggleModal()} } className="btn-comment">Add Comment</button>
        <Modal show={this.props.isOpen}
          onClose={() => this.props.toggleModal()}
          onSubmit={() => this.newComment(this.props.commentBody,this.props.commentAuthor)}>
          <div>
            <div className="comment-modal-label">
              Comment
            </div>
            <textarea
              className="comment-modal-field"
              type="text"
              placeholder="Add Comment"
              onChange={event => this.captureCommentBody(event.target.value)}
            />
          </div>
          <div>
            <div className="comment-modal-label">
              Author
            </div>
            <input
              className="comment-modal-field"
              type="text"
              placeholder="Author"
              onChange={event => this.captureCommentAuthor(event.target.value)}
            />
          </div>
        </Modal>
        <hr />
        <div className="post-position">{this.showComment()}</div>
      </div>
    );
  }

}

function mapStateToProps (state) {
  return {
    getPost: state.reducePosts.postDetail,
    getComments: state.reducePosts.comments,
    isOpen: state.modal.isOpen,
    commentBody: state.modal.comment,
    commentAuthor: state.modal.author
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatchPost: dispatch(getOnePost(ownProps.match.params.id)),
    dispatchComments: dispatch(getComments(ownProps.match.params.id)),
    deletePost: () => dispatch(deletePost(ownProps.match.params.id)),
    toggleModal: () => dispatch(toggleModal()),
    addCommentBody: (event) => dispatch(commentBodyModal(event)),
    addCommentAuthor: (event) => dispatch(commentAuthorModal(event)),
    postComment: (data) => dispatch(addComment(data)),

  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail));