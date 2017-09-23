import * as API from '../utils/api';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POST = 'FETCH_POST';
export const LATEST_POST = 'LATEST_POST';
export const POPULAR_POST = 'POPULAR_POST';
export const FETCH_ONE_POST = 'FETCH_ONE_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const ADD_COMMENT_BODY = 'ADD_COMMENT_BODY';
export const ADD_COMMENT_AUTHOR = 'ADD_COMMENT_AUTHOR';
export const VALID_MODAL = 'VALID_MODAL';
export const TOGGLE_EDIT_MODAL = 'TOGGLE_EDIT_MODAL';
export const ADD_COMMENT_ID = 'ADD_COMMENT_ID';
export const VOTE_POST = 'VOTE_POST';
export const VOTE_POST_DETAIL = 'VOTE_POST_DETAIL';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function getAllCategories() {
  const request = API.getCategories();

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_CATEGORIES,
        categories: data.categories,
      });
    });
  };
}

export function getAllPosts() {
  const request = API.getPosts();

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_POST,
        posts: data,
      });
    });
  };
}

export function getOnePost(id) {
  const request = API.getPost(id);

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_ONE_POST,
        post: data,
      });
    });
  };
}

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

export const sortPopular = () => {
  return {
    type: POPULAR_POST
  };
};

export const sortLatest = () => {
  return {
    type: LATEST_POST
  };
};

export function addPost(data) {
  const request = API.addPost(data);

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: ADD_POST,
        newPost: data,
      });
    });
  };
}

export function editPost(data) {
  const request = API.addPost(data);

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: ADD_POST,
        editedPost: data,
      });
    });
  };
}

export function deletePost(data) {
  const request = API.deletePost(data);

  return (dispatch) => {
    request.then(() => {
      dispatch({
        type: DELETE_POST
      });
    });
  };
}

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

export function addComment(data) {
  const request = API.addComment(data);

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: ADD_COMMENT,
        newComment: data
      });
    });
  };
}

export function editComment(data) {
  const request = API.editComment(data);

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: EDIT_COMMENT,
        editedPost: data,
      });
    });
  };
}

export function deleteComment(data) {
  const request = API.deleteComment(data);

  return (dispatch) => {
    request.then(() => {
      dispatch({
        type: DELETE_COMMENT
      });
    });
  };
}

export function votePost(data) {
  const request = API.votePost(data);

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: VOTE_POST,
        post: res
      });
    });
  };
}

export function votePostDetail(data) {
  const request = API.votePost(data);

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: VOTE_POST_DETAIL,
        post: res
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

