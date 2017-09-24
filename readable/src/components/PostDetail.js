import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOnePost, getComments, deletePost, addComment, 
  toggleModal, commentBodyModal, commentAuthorModal, validateModal, 
  toggleEditModal, commentIdModal, editComment, deleteComment, LATEST } from '../actions';
import Modal from './Modal';
import { getUUID, getDate } from '../utils/helper';
import Vote from './Vote';
import Sort from './Sort';

class PostDetail extends Component {

  showContent(item) {
    if(item) {
      if(item.category) {
        return (
          <div key={item.id}>
            <Vote voteData={{id: item.id, item: 'postDetail', score: item.voteScore}}  classStyle="vote-post-detail" />
            <div className="post-title">
              {item.title}
            </div>
            <div className="post-body">
              {item.body}
            </div>
            <div className="post-misc-detail">
              <div className="padding-stuff" />
                Author: {item.author}
                &nbsp;&nbsp;&nbsp;&nbsp; Category: {item.category}
                &nbsp;&nbsp;&nbsp;&nbsp; Date: {getDate(item.timestamp)}
            </div>
          </div>
        );
      } else {
        return (
          <div key={item.id}>
            <Vote voteData={{id: item.id, item: 'comment', score: item.voteScore}}  classStyle="vote-comment" />
            <div className="comment-body">
              <button onClick={() => {this.editCommentModal(item);} } className="comment-style">{item.body}</button>
            </div>
            <div className="post-misc-detail">
              <div className="padding-stuff" />
                Author: {item.author}
                &nbsp;&nbsp;&nbsp;&nbsp; Date: {getDate(item.timestamp)}
            </div>
            <div className="hrComment" />
          </div>
        );
      }
    }
  }

  editCommentModal(item) {
    this.props.toggleEditModal();
    this.props.addCommentID(item.id);
    this.props.addCommentBody(item.body);
    this.props.addCommentAuthor(item.author);
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

  showCommentModal() {
    return (
      <Modal show={this.props.isOpen}
        onClose={() => this.props.toggleModal()}
        onSubmit={() => this.newComment(this.props.commentBody,this.props.commentAuthor)}>
        <div>
          <div>
            {this.props.isValid ? null : 'Fields cannot be blank'}
          </div>
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
    );
  }

  showEditCommentModal() {
    return (
      <Modal show={this.props.isEditOpen}
        onClose={() => this.props.toggleEditModal()}
        onSubmit={() => this.changeComment(this.props.commentID, this.props.commentBody,this.props.commentAuthor)}>
        <div>
          <div>
            {this.props.isValid ? null : 'Fields cannot be blank'}
          </div>
          <div className="comment-modal-label">
            Comment
          </div>
          <textarea
            className="comment-modal-field"
            type="text"
            value={this.props.commentBody}
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
            value={this.props.commentAuthor}
            onChange={event => this.captureCommentAuthor(event.target.value)}
          />
        </div>
        <div className="footer">
          <button className='btn-modal' onClick={() => {this.removeComment(this.props.commentID); }}>
            Delete
          </button>
        </div>
      </Modal>
    );
  }

  sortComments() {
    const { getComments } = this.props;

    if (getComments) {
      if (this.props.sortValue.sortValue === LATEST) {
        getComments.sort(function (a, b) {
          return b.timestamp - a.timestamp;
        });
      } else {
        getComments.sort(function (a, b) {
          return b.voteScore - a.voteScore;
        });
      }
      return getComments;
    }
  }

  showComment() {
    const comments = this.sortComments();
    return (
      <div> 
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

  validate() {
    return !this.props.validate;
  }

  newComment(comment, author) {

    if (comment === '' || author === '') {
      this.props.validate();
    } else {
      const uuid = getUUID();
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
  }

  changeComment(comment_id, comment, author) {

    if (comment === '' || author === '') {
      this.props.validate();
    } else {
      const comment_data = {
        id: comment_id,
        timestamp: Date.now(),
        body: comment,
        author: author,
        parentId: this.props.match.params.id
      };

      this.props.editComment(comment_data);
      this.props.toggleEditModal();
      window.location.reload();
    }
  }

  removeComment(comment_id) {
    this.props.deleteComment(comment_id);
    this.props.toggleEditModal();
    window.location.reload();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <button onClick={() => {this.props.history.push('/')} } className="btn-popular">Back</button>
          <button className="btn-latest"><Link className="link-new-post" to={`/posts/edit/${this.props.match.params.id}`}>Edit</Link></button>
          <button onClick={() => {this.delPost(this.props.match.params.id)} } className="btn-latest">Delete</button>
        </div>
        <div className="post-position">{this.showPost()}</div>
        <div className="comment-position">{this.props.getComments && this.props.getComments.length} Comments</div>
        <button onClick={() => {this.props.toggleModal();} } className="btn-comment">Add Comment</button>
        <Sort sortProp={this.props.sortValue.sortValue}/>
        {this.showCommentModal()}
        {this.showEditCommentModal()}
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
    isEditOpen: state.modal.isEditOpen,
    commentBody: state.modal.comment,
    commentAuthor: state.modal.author,
    commentID: state.modal.comment_id,
    isValid: state.modal.valid,
    sortValue: state.sortValue
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatchPost: dispatch(getOnePost(ownProps.match.params.id)),
    dispatchComments: dispatch(getComments(ownProps.match.params.id)),
    deletePost: () => dispatch(deletePost(ownProps.match.params.id)),
    toggleModal: () => dispatch(toggleModal()),
    toggleEditModal: () => dispatch(toggleEditModal()),
    addCommentID: (event) => dispatch(commentIdModal(event)),
    addCommentBody: (event) => dispatch(commentBodyModal(event)),
    addCommentAuthor: (event) => dispatch(commentAuthorModal(event)),
    postComment: (data) => dispatch(addComment(data)),
    editComment: (data) => dispatch(editComment(data)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    validate: () => dispatch(validateModal())
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail));