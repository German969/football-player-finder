import reducer from '../reducer';
import { ADD_ALL, APPLY_FILTERS } from '../actions';

describe('reducer', () => {
  const initialState = {
    players: [],
    filters: {
      name: "",
      position: "Position",
      age: ""
    }
  };
  const mockPlayers = [{name: 'TEST'}];
  const mockFilters = {
    name: "Test",
    position: "Centre-Forward",
    age: "25"
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle ADD_ALL', () => {
    expect(
        reducer(initialState, {
          type: ADD_ALL,
          payload: mockPlayers
        })
    ).toEqual({
      players: mockPlayers,
      filters: {
        name: "",
        position: "Position",
        age: ""
      }
    });
  });

  it('should handle APPLY_FILTERS', () => {
    expect(
        reducer(initialState, {
          type: APPLY_FILTERS,
          payload: mockFilters
        })
    ).toEqual({
      players: [],
      filters: mockFilters
    });
  });
});