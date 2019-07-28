import { createStore, applyMiddleware, compose } from 'redux';
import { isNil, reject } from 'ramda';
import reducer from './reducer';
import thunk from 'redux-thunk';

window.__REDUX_DEVTOOLS_EXTENSION__ =
    window.__REDUX_DEVTOOLS_EXTENSION__ ||
    function(f) {
      return f;
    };

const middlewares = reject(isNil)([
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__()
]);

export const createStoreWithMiddleWare = compose(...middlewares)(createStore);
export default createStoreWithMiddleWare(reducer);
/*
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;
*/