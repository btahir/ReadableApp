import * as API from '../utils/api';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_ONE_POST = 'FETCH_ONE_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_POST = 'VOTE_POST';
export const VOTE_POST_DETAIL = 'VOTE_POST_DETAIL';
export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS';

export function getAllPosts() {
  const request = API.getPosts();


  return dispatch => {

      request.then((data) => {
        dispatch({
          type: FETCH_POST,
          posts: data,
        });
     

        // get all comments
        for(let post of data) {
          let request2 = API.getComments(post.id);
            request2.then((data) => {
              dispatch({
                type: FETCH_POST_COMMENTS,
                comments: data
              });
            });
        }
      });
  };
}

export function getOnePost(id) {
  const request = API.getPost(id);

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: FETCH_ONE_POST,
        post: res,
      });
    });
  };
}

export function addPost(data) {
  const request = API.addPost(data);

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: ADD_POST,
        newPost: res,
      });
    });
  };
}

export function editPost(data) {
  const request = API.addPost(data);

  return (dispatch) => {
    request.then((res) => {
      dispatch({
        type: EDIT_POST,
        editedPost: res,
      });
    });
  };
}

export function deletePost(data) {
  const request = API.deletePost(data);

  return (dispatch) => {
    request.then(() => {
      dispatch({
        type: DELETE_POST,
        deletedPostID: data
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

