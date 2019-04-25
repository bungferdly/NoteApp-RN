import React, { createContext, useMemo } from 'react';
import { View } from 'react-native';
import styles from './styles';

export const ScreenContext = createContext({});

function Screen({ style, ...props }) {
  styles.useLayout();

  const value = useMemo(() => {
    const listeners = {};

    function addEventListener(key, fn) {
      if (!listeners[key]) {
        listeners[key] = [];
      }
      listeners[key].push(fn);
      return function removeEventListener() {
        const idx = listeners[key].indexOf(fn);
        ~idx && listeners[key].splice(idx, 1);
      };
    }
    function sendEvent(key, ...args) {
      (listeners[key] || []).forEach(fn => fn(...args));
    }
    return { addEventListener, sendEvent };
  }, []);

  return (
    <ScreenContext.Provider value={value}>
      <View style={[styles.container, style]} {...props} />
    </ScreenContext.Provider>
  );
}

export default Screen;
