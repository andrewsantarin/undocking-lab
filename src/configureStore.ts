import { createStore, applyMiddleware } from 'redux'
import { createStateSyncMiddleware, Config as StateSyncConfig, initStateWithPrevTab } from 'redux-state-sync';
import { composeWithDevTools as compose } from 'redux-devtools-extension';
import { parseUrl } from 'query-string';

import { rootReducer } from './Root.state';
import { AppParsedQuery } from './App.types';

const config: StateSyncConfig = {
  channel: 'value',
};

const middlewares = [
  createStateSyncMiddleware(config),
];

export const configureStore = () => {
  const { query } = parseUrl(window.location.href);
  const { id } = query as AppParsedQuery;

  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middlewares)
    )
  );

  return store;
};
