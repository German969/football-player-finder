import { createSelector } from 'reselect';

const getPlayers = (state) => state.players;
const getFilters = (state) => state.filters;

function applyFilters (filters, players) {
  const filtersToApply = {
    name: filters.name !== "",
    position: (filters.position !== "Position" && filters.position !== "All"),
    age: filters.age !== ""
  };

  return players.filter(player => {
    return (
        (!filtersToApply.name ||
            (filtersToApply.name && player.name.includes(filters.name))) &&
        (!filtersToApply.position ||
            (filtersToApply.position && player.position === filters.position)) &&
        (!filtersToApply.age ||
            (filtersToApply.age && player.age === parseInt(filters.age)))
    );
  });
}

export const getFilteredPlayers = createSelector(
    [ getFilters, getPlayers ],
    applyFilters
);