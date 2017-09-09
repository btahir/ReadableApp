import * as API from '../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POST = 'FETCH_POST';

export function getAllCategories() {
  const request = API.getCategories();

  return dispatch => {
    request.then(data => {
      dispatch({
      	type: FETCH_CATEGORIES,
        categories: data.categories,
      });
    });
  };
}

export const test = {
  data: API.getCategories(),
};

export default getAllCategories;
