import { getFilteredPlayers } from '../selectors';

describe('Player Selectors', () => {
  describe('getFilteredPlayers', () => {
    it('should return filtered players', () => {
      const mockFilters = {
        name: "TEST",
        position: "Centre-Forward",
        age: "30"
      };
      const mockPlayers = [
        {name: 'TEST', position: 'Centre-Forward', age: 30},
        {name: 'INVALID', position: 'Centre-Forward', age: 30},
        {name: 'TEST', position: 'Keeper', age: 30},
        {name: 'TEST', position: 'Centre-Forward', age: 25}
      ];
      const expectedPlayers = [
          {name: 'TEST', position: 'Centre-Forward', age: 30}
      ];

      const selected = getFilteredPlayers.resultFunc(mockFilters, mockPlayers);

      expect(selected).toEqual(expectedPlayers);
    });
  });
});