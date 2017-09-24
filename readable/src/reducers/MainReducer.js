import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sortValue from './SortReducer';
import reduceCategories from './CategoriesReducer';
import modal from './ModalReducer';
import reducePosts from './PostReducer';
import reduceComments from './CommentReducer';

export default combineReducers({
  reduceCategories,
  reducePosts,
  reduceComments,
  sortValue,
  modal,
  form: formReducer
});
