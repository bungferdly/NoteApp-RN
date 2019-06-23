import { useEffect } from 'react';
import { resetTopScreen } from '../../actions/accountActions';

function LaunchScreen() {
  useEffect(resetTopScreen);
  return null;
}

export default LaunchScreen;
