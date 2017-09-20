import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  FETCH_CATEGORIES,
  FETCH_POST,
  LATEST_POST,
  POPULAR_POST,
  FETCH_ONE_POST,
  GET_COMMENTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  ADD_COMMENT,
  TOGGLE_MODAL,
  ADD_COMMENT_BODY,
  ADD_COMMENT_AUTHOR
} from '../actions';
import { reducer as formReducer } from 'redux-form';

function reduceCategories(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: Object.keys(_.mapKeys(action.categories, 'name')),
      };
    default :
      return state;
    }
}

function reducePosts(state = [], action) {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        posts: _.values(action.posts),
      };
    case FETCH_ONE_POST:
      return {
        ...state,
        postDetail: action.postDetail,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case ADD_COMMENT:
      return {
        ...state,
        newComment: action.newComment,
      };
    case ADD_POST:
      return {
        ...state,
        newPost: action.newPost,
      };
    case DELETE_POST:
      return {
        ...state
      };
    case EDIT_POST:
      return {
        ...state,
        editedPost: action.editedPost,
      };
    default :
      return state;
  }
}

function sortValue(state = [], action) {
  switch(action.type) {
    case POPULAR_POST:
      return {
        ...state,
        sortValue: POPULAR_POST,
      };
    case LATEST_POST:
      return {
        ...state,
        sortValue: LATEST_POST,
      };
    default:
      return state;
  }
}

const initialModalState = {
  modalType: null,
  modalProps: {},
  isOpen: false,
  comment: '',
  author: ''
}

function modal(state = initialModalState, action) {
  switch (action.type) {
    // case SHOW_MODAL:
    //   return {
    //     modalType: action.modalType,
    //     modalProps: action.modalProps,
    //     isOpen: action.isOpen
    //   };
    // case HIDE_MODAL:
    //   return initialModalState;
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case ADD_COMMENT_BODY:
      return {
        ...state,
        comment: action.comment
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

export default combineReducers({
  reduceCategories,
  reducePosts,
  sortValue,
  modal,
  form: formReducer
});
