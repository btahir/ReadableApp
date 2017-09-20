export function getDate(unix_timestamp) {
  let date = new Date(unix_timestamp);

  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();

  return month + '/' + day + '/' + year;
}