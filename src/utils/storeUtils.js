import { useEffect, useState } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { isEqual } from 'lodash';
import initialState from '../constants/initialState';
import accountReducer from '../reducers/accountReducer';
import noteReducer from '../reducers/noteReducer';
import themeReducer from '../reducers/themeReducer';
import apiMiddleware from '../middlewares/apiMiddleware';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const reducers = combineReducers({
  account: accountReducer,
  note: noteReducer,
  theme: themeReducer
});

const middlewares = applyMiddleware(apiMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistReducer(persistConfig, reducers), initialState, composeEnhancers(middlewares));

store.useState = function(mapState) {
  let [state, setState] = useState(() => mapState(store.getState()));
  useEffect(() => {
    function listener() {
      const newState = mapState(store.getState());
      !isEqual(state, newState) && setState(newState);
    }
    return store.subscribe(listener);
  }, [state]);
  return [state, store.dispatch];
};

export const persistor = persistStore(store);

export default store;
