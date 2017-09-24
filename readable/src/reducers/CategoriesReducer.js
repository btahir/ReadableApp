import _ from 'lodash';
import { FETCH_CATEGORIES } from '../actions/CategoriesAction';

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

export default reduceCategories;