import React from 'react';
import { 
  addComment, 
  editComment, 
  deleteComment 
} from '../actions/CommentAction';
import { 
  toggleModal, 
  commentBodyModal, 
  commentAuthorModal,
  toggleEditModal, 
  validateModal 
} from '../actions/ModalAction';
import { connect } from 'react-redux';
import { getUUID } from '../utils/helper';
import Modal from './Modal';


class CommentModal extends React.Component {

  showCommentModal() {
    return (
      <Modal show={this.props.isOpen}
        onClose={() => this.props.toggleModal()}
        onSubmit={() => this.newComment(this.props.commentBody,this.props.commentAuthor)}>
        <div>
          <div className="comment-form-warning">
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
        parentId: this.props.parentID
      };

      this.props.postComment(comment_data);
      this.props.toggleModal();
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
        parentId: this.props.parentID
      };

      this.props.editComment(comment_data);
      this.props.toggleEditModal();
    }
  }

  removeComment(comment_id) {
    this.props.deleteComment(comment_id);
    this.props.toggleEditModal();
  }

  render() {
    return (
      <div>
        {this.showCommentModal()}
        {this.showEditCommentModal()}
      </div>
    );
  }

}

function mapStateToProps (state) {
  return {
    isOpen: state.modal.isOpen,
    isEditOpen: state.modal.isEditOpen,
    commentBody: state.modal.comment,
    commentAuthor: state.modal.author,
    commentID: state.modal.comment_id,
    isValid: state.modal.valid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: () => dispatch(toggleModal()),
    toggleEditModal: () => dispatch(toggleEditModal()),
    addCommentBody: (event) => dispatch(commentBodyModal(event)),
    addCommentAuthor: (event) => dispatch(commentAuthorModal(event)),
    postComment: (data) => dispatch(addComment(data)),
    editComment: (data) => dispatch(editComment(data)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    validate: () => dispatch(validateModal())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentModal);