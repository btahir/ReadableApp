import * as API from '../utils/api';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function getComments(id) {
  const request = API.getComments(id);

  return (dispatch) => {
    request.then((data) => {
      // console.log(data)
      dispatch({
        type: GET_COMMENTS,
        comments: data,
      });
    });
  };
}

export function addComment(data) {
  const request = API.addComment(data);

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: ADD_COMMENT,
        newComment: res
      });
    });
  };
}

export function editComment(data) {
  const request = API.editComment(data);

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: EDIT_COMMENT,
        editedComment: res,
      });
    });
  };
}

export function deleteComment(data) {
  const request = API.deleteComment(data);

  return (dispatch) => {
    request.then(() => {
      dispatch({
        type: DELETE_COMMENT,
        deletedCommentID: data
      });
    });
  };
}

export function voteComment(data) {
  const request = API.voteComment(data);

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: VOTE_COMMENT,
        comment: res
      });
    });
  };
}