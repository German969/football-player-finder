import React from 'react';
import App from '../App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import {makeMountRender, reduxify, mockApi} from '../utils/test-utils';
import { act, waitForNextUpdate } from 'react-test-renderer';
import playersMock from '../__mocks__/players.mock';
import axios from 'axios';
import 'babel-polyfill';

jest.mock('axios');

describe('Integrating App', () => {
  const resp = {data: playersMock};
  Enzyme.configure({ adapter: new Adapter() });

  beforeEach(() => {
    //mockApi.getPlayers();
    axios.get.mockClear();
  });
/*
  afterEach(async () => {
    fetchMock.restore();
  });*/

  it('should render correctly', async function() {
    axios.get.mockResolvedValue(resp);
    let wrapper = makeMountRender(reduxify(App))();

    expect(wrapper.find('.App-title').text()).toBe('Football Player Finder');
    expect(wrapper.find('Form').hasClass('search-form')).toBeTruthy();
    expect(wrapper.find('Table').hasClass('players-table')).toBeTruthy();

    await act(async () => {
      wrapper = makeMountRender(reduxify(App))();
    });

    wrapper.update();

    expect(wrapper.find('tr').at(1).find('td').at(0).text()).toBe('Romelu Lukaku');
  });
});