export const VALID_MODAL = 'VALID_MODAL';
export const TOGGLE_EDIT_MODAL = 'TOGGLE_EDIT_MODAL';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const ADD_COMMENT_BODY = 'ADD_COMMENT_BODY';
export const ADD_COMMENT_AUTHOR = 'ADD_COMMENT_AUTHOR';
export const ADD_COMMENT_ID = 'ADD_COMMENT_ID';

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};

export const toggleEditModal = () => {
  return {
    type: TOGGLE_EDIT_MODAL
  };
};

export const validateModal = () => {
  return {
    type: VALID_MODAL
  };
};

export const commentBodyModal = (comment) => {
  return {
    type: ADD_COMMENT_BODY,
    comment: comment
  };
};

export const commentAuthorModal = (author) => {
  return {
    type: ADD_COMMENT_AUTHOR,
    author: author
  };
};

export const commentIdModal = (id) => {
  return {
    type: ADD_COMMENT_ID,
    comment_id: id
  };
};