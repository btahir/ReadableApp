// import { getCategoriesAction } from '../actions';
// import * as API from '../utils/api';
import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  FETCH_CATEGORIES,
  FETCH_POST,
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

export default combineReducers({
  reduceCategories,
  reducePosts,
});

        // posts: {
        //   author: Object.keys(_.mapKeys(action.posts, 'title')),
        //   body: Object.keys(_.mapKeys(action.posts, 'title')),
        //   category: Object.keys(_.mapKeys(action.posts, 'title')),
        //   deleted: Object.keys(_.mapKeys(action.posts, 'title')),
        //   id: Object.keys(_.mapKeys(action.posts, 'title')),
        //   timestamp: Object.keys(_.mapKeys(action.posts, 'title')),
        //   title: Object.keys(_.mapKeys(action.posts, 'title')),
        //   voteScore: Object.keys(_.mapKeys(action.posts, 'title')),
        // },

