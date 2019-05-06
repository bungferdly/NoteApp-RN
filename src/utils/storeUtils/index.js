import { useEffect, useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { isEqual } from 'lodash';
import initialState, { whitelist } from '../../constants/initialState';
import accountReducer from '../../reducers/accountReducer';
import noteReducer from '../../reducers/noteReducer';
import themeReducer from '../../reducers/themeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist
};

const reducers = combineReducers({
  account: accountReducer,
  note: noteReducer,
  theme: themeReducer
});

const store = createStore(persistReducer(persistConfig, reducers), initialState, composeWithDevTools());

store.useState = function(mapState) {
  let [state, setState] = useState(() => mapState(store.getState()));
  useEffect(() => {
    function listener() {
      const newState = mapState(store.getState());
      !isEqual(state, newState) && setState(newState);
    }
    return store.subscribe(listener);
  }, [state]);
  return state;
};

export const persistor = persistStore(store);

export default store;
