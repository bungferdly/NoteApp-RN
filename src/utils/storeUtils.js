import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import accountReducer from '../reducers/accountReducer';
import noteReducer from '../reducers/noteReducer';
import apiMiddleware from '../middlewares/apiMiddleware';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const reducers = combineReducers({
  account: accountReducer,
  note: noteReducer
});

const middlewares = applyMiddleware(apiMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistReducer(persistConfig, reducers), undefined, composeEnhancers(middlewares));

export const persistor = persistStore(store);

export default store;
