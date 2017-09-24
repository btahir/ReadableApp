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
        newComment: action.newComment,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        editedComment: action.editedComment,
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
        ...state
      };
    default :
      return state;
  }
}

export default reduceComments;