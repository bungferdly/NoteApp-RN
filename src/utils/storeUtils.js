import { useEffect, useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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

const store = createStore(persistReducer(persistConfig, reducers), initialState, composeWithDevTools(middlewares));

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
