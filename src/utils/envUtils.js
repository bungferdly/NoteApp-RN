import { NativeModules } from 'react-native';

const select = envs => {
  const env = NativeModules.AppConfig.env;
  return envs[env] || envs['default'];
};

const env = {
  select
};

export default env;
