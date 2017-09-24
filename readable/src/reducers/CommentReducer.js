import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from '../actions/CommentAction';

function reduceComments(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.newComment] // can also use state.comments.concat(action.newComment)
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.editedComment.id) {
              return action.editedComment;
            }
          else {
            return comment;
          }})
      };
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.comment.id) {
              return action.comment;
            }
          else {
            return comment;
          }})
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.deletedCommentID)
      };
    default :
      return state;
  }
}

export default reduceComments;