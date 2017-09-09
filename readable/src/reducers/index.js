// import { getCategoriesAction } from '../actions';
// import * as API from '../utils/api';
import { FETCH_CATEGORIES } from '../actions';
import _ from 'lodash';

// const allCategories = {
//   data: API.getCategories(),
// };

function reduceCategories(state = {}, action) {
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
