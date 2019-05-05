import store from '../../utils/storeUtils';
import { resetTopScreen } from '../../actions/accountActions';

function LaunchScreen() {
  store.dispatch(resetTopScreen());
  return null;
}

export default LaunchScreen;
