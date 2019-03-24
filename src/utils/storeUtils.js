import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import accountReducer from '../reducers/accountReducer';
import noteReducer from '../reducers/noteReducer';
import sessionMiddleware from '../middlewares/sessionMiddleware';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const reducers = combineReducers({
  account: accountReducer,
  note: noteReducer
});

const middlewares = applyMiddleware(sessionMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistReducer(persistConfig, reducers), undefined, composeEnhancers(middlewares));

export const createPersistor = () => persistStore(store);
