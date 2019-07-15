import getPlayers from './utilities/get-players';

export const ADD_ALL = 'ADD_ALL';
export const APPLY_FILTERS = 'APPLY_FILTERS';

export function fetchPlayers() {
  return function (dispatch) {
    return getPlayers().then(
        players => dispatch(addPlayers(players)),
        error => console.log(error)
    );
  };
}

export function addPlayers(players) {
  return {
    type: ADD_ALL,
    payload: players
  };
}

export function applyFilters (filters) {
  return {
    type: APPLY_FILTERS,
    payload: filters
  }
}