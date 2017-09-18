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
  DELETE_POST
} from '../actions';
// import {
//   combineForms,
//   createForms // optional
// } from 'react-redux-form';
import { reducer as formReducer } from 'redux-form';

// const initialUserState = {
//   firstName: '',
//   lastName: ''
// };

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
    case ADD_POST:
      return {
        ...state,
        newPost: action.newPost,
      };
    case DELETE_POST:
      return {
        ...state
      };
    default :
      return state;
  }
}

function sortValue(state = [], action) {
  // console.log('sortValue', action);
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

export default combineReducers({
  reduceCategories,
  reducePosts,
  sortValue,
  form: formReducer
});
