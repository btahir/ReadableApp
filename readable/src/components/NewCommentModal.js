import React from 'react';
import { addComment } from '../actions/CommentAction';
import { 
  toggleModal, 
  commentBodyModal, 
  commentAuthorModal,
  validateModal 
} from '../actions/ModalAction';
import { connect } from 'react-redux';
import { getUUID } from '../utils/helper';
import Modal from './Modal';


class NewCommentModal extends React.Component {

  showCommentModal() {
    const { toggleModal,commentBody,commentAuthor,
      addCommentBody,addCommentAuthor,isValid,isOpen } = this.props;
    return (
      <Modal show={isOpen}
        onClose={() => toggleModal()}
        onSubmit={() => this.newComment(commentBody,commentAuthor)}>
        <div>
          <div className="comment-form-warning">
            {isValid ? null : 'Fields cannot be blank'}
          </div>
          <div className="comment-modal-label">
            Comment
          </div>
          <textarea
            className="comment-modal-field"
            type="text"
            placeholder="Add Comment"
            onChange={event => addCommentBody(event.target.value)}
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
            onChange={event => addCommentAuthor(event.target.value)}
          />
        </div>
      </Modal>
    );
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

      // clear old values
      this.props.addCommentBody('');
      this.props.addCommentAuthor('');
    }
  }

  render() {
    return (
      <div>
        {this.showCommentModal()}
      </div>
    );
  }

}

function mapStateToProps (state) {
  return {
    isOpen: state.modal.isOpen,
    commentBody: state.modal.comment,
    commentAuthor: state.modal.author,
    commentID: state.modal.comment_id,
    isValid: state.modal.valid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: () => dispatch(toggleModal()),
    addCommentBody: (event) => dispatch(commentBodyModal(event)),
    addCommentAuthor: (event) => dispatch(commentAuthorModal(event)),
    postComment: (data) => dispatch(addComment(data)),
    validate: () => dispatch(validateModal())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCommentModal);