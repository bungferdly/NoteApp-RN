import { NativeModules } from 'react-native';

export const selectEnv = envs => {
  const env = NativeModules.AppConfig.env;
  return envs[env] || envs['default'];
};
