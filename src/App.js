import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import ActivityOverlay from './components/ActivityOverlay';
import StatusBar from './components/StatusBar';
import AppContainer from './navigators/AppContainer';
import { persistor } from './utils/storeUtils';
import navigation from './utils/navigationUtils';
import activity from './utils/activityUtils';

export default class App extends React.Component {
  render() {
    return (
      <PersistGate persistor={persistor}>
        <StatusBar />
        <AppContainer ref={navigation.setNavigator} />
        <ActivityOverlay ref={activity.setComponent} />
      </PersistGate>
    );
  }
}
