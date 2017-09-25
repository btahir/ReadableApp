import React from 'react';
import {
  editComment, 
  deleteComment 
} from '../actions/CommentAction';
import {
  commentBodyModal, 
  commentAuthorModal,
  toggleEditModal, 
  validateModal 
} from '../actions/ModalAction';
import { connect } from 'react-redux';
import Modal from './Modal';


class EditCommentModal extends React.Component {

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
            onChange={event => this.props.addCommentBody(event.target.value)}
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
            onChange={event => this.props.addCommentAuthor(event.target.value)}
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

  validate() {
    return !this.props.validate;
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

      // clear old values
      this.props.addCommentBody('');
      this.props.addCommentAuthor('');
    }
  }

  removeComment(comment_id) {
    this.props.deleteComment(comment_id);
    this.props.toggleEditModal();

    // clear old values
    this.props.addCommentBody('');
    this.props.addCommentAuthor('');
  }

  render() {
    return (
      <div>
        {this.showEditCommentModal()}
      </div>
    );
  }

}

function mapStateToProps (state) {
  return {
    isEditOpen: state.modal.isEditOpen,
    commentBody: state.modal.comment,
    commentAuthor: state.modal.author,
    commentID: state.modal.comment_id,
    isValid: state.modal.valid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEditModal: () => dispatch(toggleEditModal()),
    addCommentBody: (event) => dispatch(commentBodyModal(event)),
    addCommentAuthor: (event) => dispatch(commentAuthorModal(event)),
    editComment: (data) => dispatch(editComment(data)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    validate: () => dispatch(validateModal())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCommentModal);