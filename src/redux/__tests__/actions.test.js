import * as actions from '../actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getPlayers from '../utilities/get-players';

jest.mock('../utilities/get-players');

describe('actions', () => {
  it('should create an action to add players', () => {
    const players = [{name: 'TEST'}];
    const expectedAction = {
      type: actions.ADD_ALL,
      payload: players
    };

    expect(actions.addPlayers(players)).toEqual(expectedAction);
  });

  it('should create an action to apply filters', () => {
    const filters = {name: 'TEST'};
    const expectedAction = {
      type: actions.APPLY_FILTERS,
      payload: filters
    };

    expect(actions.applyFilters(filters)).toEqual(expectedAction);
  });

  describe('async actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    beforeEach(() => {
      getPlayers.mockClear();
      getPlayers.mockImplementation(() => {
        return new Promise((resolve) => {
          resolve({ players: [{name: 'TEST'}] });
        });
      });
    });

    it('create add players action when fetching players has been done', () => {
      const expectedActions = [
          { type: 'ADD_ALL', payload: { players: [{name: 'TEST'}] } }
      ];
      const store = mockStore({ players: [] });

      return store.dispatch(actions.fetchPlayers()).then(() => {
        expect(getPlayers).toHaveBeenCalledTimes(1);
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should log an error if get players fails', () => {
      const store = mockStore({ players: [] });
      const testError = {error: 'ERROR_TEST'};

      getPlayers.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject(testError);
        });
      });
      global.console = {
        log: jest.fn()
      };

      return store.dispatch(actions.fetchPlayers()).then(() => {
        expect(getPlayers).toHaveBeenCalledTimes(1);
        expect(store.getActions()).toEqual([]);
        expect(global.console.log).toHaveBeenCalledWith(testError);
      });
    });
  });
});