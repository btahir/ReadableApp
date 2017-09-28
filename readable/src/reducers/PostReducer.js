import _ from 'lodash';
import {
  FETCH_POST,
  FETCH_ONE_POST,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  VOTE_POST,
  VOTE_POST_DETAIL
} from '../actions/PostAction';

function reducePosts(state = [], action) {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        posts: _.values(action.posts)
      };
    case FETCH_ONE_POST:
      return {
        ...state,
        posts: state.posts && state.posts.filter(post => post.id === action.post.id)
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.newPost] // can also use state.posts.concat(action.newPost)
      };
    case VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post.id === action.post.id) {
              return action.post;
            }
          else {
            return post;
          }})
      };
    case VOTE_POST_DETAIL:
      return {
        ...state,
        postDetail: action.post
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.deletedPostID)
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post.id === action.editedPost.id) {
              return action.editedPost;
            }
          else {
            return post;
          }})
      };
    default :
      return state;
  }
}

export default reducePosts;