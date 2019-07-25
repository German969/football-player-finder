import React from 'react';
import { App } from '../App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('App', () => {
  Enzyme.configure({ adapter: new Adapter() });

  function AppSetup() {
    const AppProps = {
      players: [],
      addPlayers: jest.fn(),
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

    expect(AppWrapper.find('div').hasClass('App')).toBeTruthy();
    expect(AppWrapper.find('h1').hasClass('App-title')).toBeTruthy();
    expect(AppWrapper.find('h1').text()).toBe('Football Player Finder');
    expect(PlayersTableProps.playersList).toEqual([]);
  });

    it('should call function to fetch players', () => {
      const { AppProps } = AppSetup();

      expect(AppProps.fetchPlayers.mock.calls.length).toBe(1);
    });
});
