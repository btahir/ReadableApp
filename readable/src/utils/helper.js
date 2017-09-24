import { LATEST } from '../actions/SortAction';

export function getDate(unix_timestamp) {
  let date = new Date(unix_timestamp);

  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();

  return month + '/' + day + '/' + year;
}

export function getUUID() {
  return Math.floor((1 + Math.random()) * 0x1000000000000)
    .toString(16);
}

export function sortItems(items, sortValue) {

    if (items) {
      if (sortValue === LATEST) {
        items.sort(function (a, b) {
          return b.timestamp - a.timestamp;
        });
      } else {
        items.sort(function (a, b) {
          return b.voteScore - a.voteScore;
        });
      }
      return items;
    }
  }