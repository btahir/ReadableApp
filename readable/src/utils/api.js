const api = process.env.REACT_APP_CATEGORIES_API_URL || 'http://localhost:5001';

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json());

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json());

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json());

export const addPost = (post) =>
  fetch(`${api}/posts`, { 
    method: 'post',
    headers: headers,
    body: JSON.stringify(post) })
    .then(res => res.json());

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, { 
    method: 'delete',
    headers: headers });
  