import { getCategories } from '../utils/api';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function getAllCategories() {
  const request = getCategories();

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_CATEGORIES,
        categories: data.categories,
      });
    });
  };
}