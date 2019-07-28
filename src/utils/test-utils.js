import React from 'react';
import rootReducer, {initialState} from "../redux/reducer";
import {createStoreWithMiddleWare} from "../redux/store";
import { mergeDeepRight } from 'ramda';
import { mount } from "enzyme/build";
import { Provider } from "react-redux";
import fetchMock from 'fetch-mock';
import playersMock from '../__mocks__/players.mock';

export const makeStore = (customState = {}) => {
  const root = rootReducer(initialState, { type: '@@INIT' });
  const state = mergeDeepRight(root, customState);
  return createStoreWithMiddleWare(rootReducer, state);
};

export const makeMountRender = (Component, defaultProps = {}) => {
  return (customProps = {}) => {
    const props = {
      ...defaultProps,
      ...customProps
    };
    return mount(<Component {...props} />);
  };
};

export const reduxify = (Component, props = {}, state = {}) => {
  return function reduxWrap() {
    return (
        <Provider store={makeStore(state)}>
          <Component {...props} />
        </Provider>
    );
  }
};

export const mockApi = {
  getPlayers: () => {
    fetchMock.get(
        'https://football-players-b31f2.firebaseio.com/players.json',
        playersMock
    );
  }
};