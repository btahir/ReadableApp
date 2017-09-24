import {
  TOGGLE_MODAL,
  ADD_COMMENT_BODY,
  ADD_COMMENT_AUTHOR,
  VALID_MODAL,
  TOGGLE_EDIT_MODAL,
  ADD_COMMENT_ID
} from '../actions/ModalAction';

const initialModalState = {
  modalType: null,
  modalProps: {},
  isOpen: false,
  isEditOpen: false,
  valid: true,
  comment: '',
  author: '',
  comment_id: ''
};

function modal(state = initialModalState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditOpen: !state.isEditOpen
      };
    case VALID_MODAL:
      return {
        ...state,
        valid: false
      };
    case ADD_COMMENT_BODY:
      return {
        ...state,
        comment: action.comment
      };
    case ADD_COMMENT_ID:
      return {
        ...state,
        comment_id: action.comment_id
      };
    case ADD_COMMENT_AUTHOR:
      return {
        ...state,
        author: action.author
      };
    default:
      return state;
  }
}

export default modal;