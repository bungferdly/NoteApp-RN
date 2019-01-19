import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ActivityOverlay from './components/ActivityOverlay';
import RootNavigator from './navigators/RootNavigator';
import { store, createPersistor } from './services/ReduxService';
import { setTopLevelNavigator } from './services/NavigationService';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={createPersistor()}>
          <RootNavigator ref={setTopLevelNavigator} />
          <ActivityOverlay />
        </PersistGate>
      </Provider>
    );
  }
}
