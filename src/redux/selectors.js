import { createSelector } from 'reselect';

const getPlayers = (state) => state.players;
const getFilters = (state) => state.filters;

function applyFilters (filters, players) {
  filters.forEach(function (filter) {
    switch (filter.name) {
      case 'name':
        return players.filter(player => player.name.includes(filter.value));
      case 'position':
        return players.filter(player => player.position === filter.value);
      case 'age':
        return players.filter(player => player.age === filter.value);
      default:
        return players
    }
  });
}

export const getFilteredPlayers = createSelector(
    [ getFilters, getPlayers ],
    applyFilters
);