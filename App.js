import React from 'react';
import { View, Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'

import AppNavigator from './navigators/AppNavigator';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers'

const persistConfig = {
  key: 'root-1.0.2',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, {}, compose(applyMiddleware(thunkMiddleware)));
let persistor = persistStore(store);

export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>;
  }
}