const token = '1234567';

export function getCategories() {
  return fetch('http://localhost:5001/categories', {
    headers: { Authorization: token },
  })
    .then(res => res.json())
    .then(data => data.categories);
}
