import {
  LATEST,
  POPULAR,
} from '../actions/SortAction';


function sortValue(state = [], action) {
  switch(action.type) {
    case POPULAR:
      return {
        ...state,
        sortValue: POPULAR,
      };
    case LATEST:
      return {
        ...state,
        sortValue: LATEST,
      };
    default:
      return state;
  }
}

export default sortValue;