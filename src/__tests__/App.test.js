import React from 'react';
import { App } from '../App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getFilteredPlayers } from '../redux/selectors';

jest.mock('../redux/selectors');

describe('App', () => {
  Enzyme.configure({ adapter: new Adapter() });

  getFilteredPlayers.mockImplementation(() => {
    return [];
  });

  function AppSetup() {
    const AppProps = {
      players: getFilteredPlayers(),
      fetchPlayers: jest.fn()
    };

    const AppWrapper = shallow(<App {...AppProps} />);

    return {
      AppProps,
      AppWrapper
    }
  }

  it('should render with default props', () => {
    const { AppWrapper } = AppSetup();
    const PlayersTableProps = AppWrapper.find('PlayersTable').props();
    const SearchForm = AppWrapper.find('SearchForm');

    expect(AppWrapper.find('div').hasClass('App')).toBeTruthy();
    expect(AppWrapper.find('h1').hasClass('App-title')).toBeTruthy();
    expect(AppWrapper.find('h1').text()).toBe('Football Player Finder');
    expect(SearchForm).toBeDefined();
    expect(PlayersTableProps.playersList).toEqual([]);
    expect(getFilteredPlayers).toHaveBeenCalledTimes(1);
  });
});
