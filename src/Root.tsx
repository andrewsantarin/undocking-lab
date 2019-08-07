import React from 'react';
import { Provider } from 'react-redux';

import { App } from './App';

import { configureStore } from './configureStore';

const store = configureStore();

export function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
