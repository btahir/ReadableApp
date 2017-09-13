// import { getCategoriesAction } from '../actions';
// import * as API from '../utils/api';
import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  FETCH_CATEGORIES,
  FETCH_POST,
  LATEST_POST,
  POPULAR_POST
} from '../actions';


// const initialPostState = {
//   author: null,
//   body: null,
//   category: null,
//   deleted: null,
//   id: null,
//   timestamp: null,
//   title: null,
//   voteScore: null,
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
});
