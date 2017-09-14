import * as API from '../utils/api';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POST = 'FETCH_POST';
export const LATEST_POST = 'LATEST_POST';
export const POPULAR_POST = 'POPULAR_POST';

export function getAllCategories() {
  const request = API.getCategories();

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_CATEGORIES,
        categories: data.categories,
      });
    });
  };
}

export function getAllPosts() {
  const request = API.getPosts();

  return (dispatch) => {
    request.then((data) => {
      // console.log(data)
      dispatch({
        type: FETCH_POST,
        posts: data,
      });
    });
  };
}

export const sortPopular = () => {
  return {
    type: POPULAR_POST
  };
};

export const sortLatest = () => {
  return {
    type: LATEST_POST
  };
};


