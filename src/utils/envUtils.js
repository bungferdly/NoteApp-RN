import { NativeModules } from 'react-native';

export default {
  select: envs => {
    const env = NativeModules.AppConfig.env;
    return envs[env] || envs['default'];
  }
};
