import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ActivityOverlay from './components/ActivityOverlay';
import RootNavigator from './navigators/RootNavigator';
import store, { persistor } from './utils/storeUtils';
import navigation from './utils/navigationUtils';
import activity from './utils/activityUtils';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootNavigator ref={navigation.setNavigator} />
          <ActivityOverlay ref={activity.setComponent} />
        </PersistGate>
      </Provider>
    );
  }
}
