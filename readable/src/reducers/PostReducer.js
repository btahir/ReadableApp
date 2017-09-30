import _ from 'lodash';
import {
  FETCH_POST,
  FETCH_POST_COMMENTS,
  FETCH_ONE_POST,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  VOTE_POST,
  VOTE_POST_DETAIL
} from '../actions/PostAction';

function excludeDuplicates(array, comment) {
  const new_array = array.concat(comment);
  return _.uniqBy(new_array, 'id');
}

function reducePosts(state = {'comments':[]}, action) {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        posts: _.values(action.posts)
      };
    case FETCH_POST_COMMENTS:
      return {
        ...state,
        comments: excludeDuplicates(state.comments, action.comments)
      };
    case FETCH_ONE_POST:
      return {
        ...state,
        posts: [action.post]
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