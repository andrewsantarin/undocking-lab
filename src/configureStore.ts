import { createStore, applyMiddleware } from 'redux'
import { createStateSyncMiddleware, Config as StateSyncConfig, initStateWithPrevTab } from 'redux-state-sync';
import { composeWithDevTools as compose } from 'redux-devtools-extension';

import { rootReducer } from './Root.state';

const config: StateSyncConfig = {
  channel: 'value',
};

const middlewares = [
  createStateSyncMiddleware(config),
];

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middlewares)
    )
  );

  initStateWithPrevTab(store);

  return store;
};
