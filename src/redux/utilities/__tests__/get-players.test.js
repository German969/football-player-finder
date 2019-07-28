import getPlayers from '../get-players';
import axios from 'axios';
import moment from "moment";

jest.mock('axios');
jest.mock('moment', () => () => ({
  diff: () => 26
}));

describe.skip('get players', () => {
  const players = [
      {
        name: 'TEST',
        contractUntil: 'testDate',
        jerseyNumber: 10,
        dateOfBirth: '1993-05-13',
        nationality: 'testNationality',
        position: 'testPosition'
      }
  ];
  const resp = {data: players};
  const expectedPlayers = [
      {
        name: 'TEST',
        age: 26,
        nationality: 'testNationality',
        position: 'testPosition'
      }
  ];

  beforeEach(() => {
    axios.get.mockClear();
  });

  it('should retrieve players from API', () => {
    axios.get.mockResolvedValue(resp);

    return getPlayers().then(data => {
      expect(data).toEqual(expectedPlayers);
      expect(axios.get).toBeCalledTimes(1);
    });
  });

  it('should show an error if data fetching fails', () => {
    const testError = { error: 'ERROR' };

    axios.get.mockImplementation(() =>
        Promise.reject(testError)
    );
    global.console = {
      log: jest.fn()
    };

    return getPlayers().then(() => {
      expect(axios.get).toBeCalledTimes(1);
      expect(global.console.log).toHaveBeenCalledWith(testError);
    });
  });
});