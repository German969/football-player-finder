import React from 'react';
import App from '../App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { makeMountRender, reduxify } from '../utils/test-utils';
import { act } from 'react-test-renderer';
import playersMock from '../__mocks__/players.mock';
import axios from 'axios';
import 'babel-polyfill';

jest.mock('axios');

describe('Integrating App', () => {
  const resp = {data: playersMock};
  Enzyme.configure({ adapter: new Adapter() });

  beforeEach(() => {
    axios.get.mockResolvedValue(resp);
  });

  afterAll(() => {
    axios.get.mockClear();
  });

  it('should render correctly', function() {
    const wrapper = makeMountRender(reduxify(App))();

    expect(wrapper.find('.App-title').text()).toBe('Football Player Finder');
    expect(wrapper.find('Form').hasClass('search-form')).toBeTruthy();
    expect(wrapper.find('Table').hasClass('players-table')).toBeTruthy();
  });

  it('should fetch players and pass them to the table', async () => {
    let wrapper;
    let player;

    await act(async () => {
      wrapper = makeMountRender(reduxify(App))();
    });
    wrapper.update();

    player = wrapper.find('tr').at(1);

    expect(player.find('td').at(0).text()).toBe('Romelu Lukaku');
  });

  it('should filter players properly', async () => {
    let wrapper;
    let form;
    let inputs;
    let playerNameInput;
    let positionInput;
    let ageInput;

    await act(async () => {
      wrapper = makeMountRender(reduxify(App))();
    });
    wrapper.update();

    form = wrapper.find('form');
    inputs = wrapper.find('input');
    playerNameInput = inputs.at(0);
    positionInput = wrapper.find('select');
    ageInput = inputs.at(1);

    playerNameInput.simulate("change", { target: { value: 'A' } });
    positionInput.simulate('change', { target: { value: 'Left Wing' } });
    ageInput.simulate('change', { target: { value: 30 } });

    form.simulate('submit');

    expect(wrapper.find('tr').length).toBe(2);
    expect(wrapper.find('td').at(0).text()).toBe('Alexis Sánchez');
  });
});